
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, children, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-black flex flex-col gap-6 rounded-xl shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-gray-500 text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardAction({ className, children, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start justify-self-end", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
