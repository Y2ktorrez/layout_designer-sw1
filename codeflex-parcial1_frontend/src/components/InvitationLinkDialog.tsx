"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Props {
  invitationLink: string;
}

export const InvitationLinkDialog = ({ invitationLink }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
    alert("Enlace copiado al portapapeles!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2 text-primary hover:text-white hover:bg-primary/10">
          Get Invitation Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-medium">Invitation Link</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Copy and share this link with your friends.
        </DialogDescription>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <input
              type="text"
              value={invitationLink}
              readOnly
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopyLink}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
