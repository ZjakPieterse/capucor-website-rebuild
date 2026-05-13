'use client'

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button premium-button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold tracking-[-0.01em] whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive/50 aria-invalid:ring-3 aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&_svg]:translate-x-0.5 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_38%,transparent),0_18px_50px_-24px_var(--primary)] hover:bg-primary/95 hover:shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_55%,transparent),0_24px_70px_-28px_var(--primary)] [a]:hover:bg-primary/95",
        outline:
          "border-white/10 bg-white/[0.045] text-foreground backdrop-blur-xl hover:border-primary/35 hover:bg-white/[0.075] hover:shadow-[0_18px_60px_-34px_var(--primary)] aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "border-white/8 bg-secondary/70 text-secondary-foreground backdrop-blur-md hover:bg-secondary/90 hover:border-white/14 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "text-muted-foreground hover:bg-white/[0.055] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/15 text-destructive hover:bg-destructive/25 focus-visible:border-destructive/40 focus-visible:ring-destructive/40",
        link: "rounded-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 rounded-full px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-full px-3.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-9 rounded-full",
        "icon-xs":
          "size-7 rounded-full in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-full in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  onPointerMove,
  onPointerLeave,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  function handlePointerMove(
    event: Parameters<NonNullable<ButtonPrimitive.Props["onPointerMove"]>>[0]
  ) {
    onPointerMove?.(event)

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    event.currentTarget.style.setProperty('--magnet-x', `${x * 0.16}px`)
    event.currentTarget.style.setProperty('--magnet-y', `${y * 0.22}px`)
  }

  function handlePointerLeave(
    event: Parameters<NonNullable<ButtonPrimitive.Props["onPointerLeave"]>>[0]
  ) {
    onPointerLeave?.(event)
    event.currentTarget.style.setProperty('--magnet-x', '0px')
    event.currentTarget.style.setProperty('--magnet-y', '0px')
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    />
  )
}

export { Button, buttonVariants }
