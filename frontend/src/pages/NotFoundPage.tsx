import { Link } from "react-router"

import { PageError } from "@/components/PageState"
import { Button } from "@/components/ui/button"
import { routes } from "@/utils/routes"

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh p-6">
      <PageError
        title="Page not found"
        action={
          <Button nativeButton={false} render={<Link to={routes.dashboard()} />}>
            Back to courses
          </Button>
        }
      />
    </div>
  )
}
