import uuid

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

from utils.string_utils import sanitize_username


class UserAccountManager(BaseUserManager):

    RESTRICTED_USERNAMES = ["admin", "undefined", "null", "superuser", "root", "system"]
    
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Users must have an email address.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        username = extra_fields.get("username", None)
        if username:
            sanitized_username = sanitize_username(username)

            if sanitized_username.lower() in self.RESTRICTED_USERNAMES:
                raise ValueError(f"The username '{sanitized_username}' is not allowed.")
            
            user.username = sanitized_username
        
        username = extra_fields.get("username", None)
        if username and username.lower() in self.RESTRICTED_USERNAMES:
            raise ValueError(f"The username '{username}' is not allowed.")
        
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password, **extra_Fields):
        user = self.create_user(email, password, **extra_Fields)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.role = 'admin'
        user.save(using=self._db)
        return user
    

class UserAccount(AbstractBaseUser, PermissionsMixin):

    roles = (
        ("customer", "Customer"),
        ("admin", "Admin"),
    )

    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    role = models.CharField(max_length=20, choices=roles, default="customer")
    verified = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    login_ip = models.CharField(max_length=255, blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

