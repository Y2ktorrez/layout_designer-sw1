"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Props {
  triggerLabel?: string;
  variant?: "default" | "outline";
}

export const CreateProjectDialog = ({ triggerLabel = "Start Designing", variant = "outline" }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationLink, setInvitationLink] = useState<string | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/api/projects/`, {
        name: projectName,
        description: projectDescription,
      });

      console.log("Proyecto creado:", response.data);
      setProjectName("");
      setProjectDescription("");
      setInvitationLink(response.data.data.invitation_link);
      setIsOpen(false); // Cerrar el formulario de creación del proyecto
      setIsSuccessDialogOpen(true); // Abrir el dialogo de éxito

    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink).then(() => {
        console.log("Enlace copiado al portapapeles");
      }).catch(err => {
        console.error("Error al copiar el enlace:", err);
      });
    }
  };

  const handleRedirect = () => {
    router.push("/grapesjs");
  };

  return (
    <>
      {/* Formulario para crear el proyecto */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            asChild
            variant={variant}
            className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
          >
            <span>{triggerLabel}</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-xl font-medium">Create New Project</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter the details for your new project
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            <div className="space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm 
                focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="projectDescription" className="text-sm font-medium">
                Project Description
              </label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm 
                focus:outline-none focus:ring-1 focus:ring-primary transition-shadow min-h-24 resize-none"
                placeholder="Describe your project"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="px-4"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de éxito después de la creación del proyecto */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-xl font-medium">Project Created Successfully</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Your project has been created. You can now use the invitation link.
          </DialogDescription>

          {invitationLink && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Invitation Link:</p>
              <input
                type="text"
                value={invitationLink}
                readOnly
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm 
                focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="px-4"
            >
              Copy Link
            </Button>
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
              onClick={handleRedirect}
            >
              Go to GrapesJS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
