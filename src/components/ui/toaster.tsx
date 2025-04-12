
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-stone-800 border-2 border-amber-700 text-amber-200">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-amber-400">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-amber-200">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-amber-400 hover:text-amber-200" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
