
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    content: React.ReactNode;
  };
}

const ProjectDialog = ({ isOpen, onClose, project }: ProjectDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription>
            Detailed project overview
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] mt-4 pr-4">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            {project.content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
