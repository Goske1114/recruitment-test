import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function YesNo({content, title, setIsOpen, isOpen, onYes}) {
  const handleOk = e => {
    setIsOpen(false)
    onYes()
  }
  return (
    <AlertDialog open={isOpen} onClose={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle style={{color: 'black'}}>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{color: 'black'}} onClick={e => setIsOpen(false)}>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk}>Yes</AlertDialogAction>
        </AlertDialogFooter >
      </AlertDialogContent>
    </AlertDialog>
  )
}