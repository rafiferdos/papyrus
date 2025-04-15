// First, import the modal components (example using ShadCN)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Then update your DeleteConfirmationModal component:
interface DeleteConfirmationModalProps {
  name: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionText?: string;
  confirmButtonText?: string;
}

export const StatusConfirmationModal = ({
  name,
  isOpen,
  onOpenChange,
  onConfirm,
  actionText = "Are you sure you want to delete",
  confirmButtonText = "Confirm",
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            {actionText} <strong>{name}</strong>?
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="dark:bg-gray-700 bg-black text-white hover:dark:bg-gray-700 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-rose-500 text-white cursor-pointer hover:bg-rose-500"
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
