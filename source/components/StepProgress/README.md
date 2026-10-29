# StepProgress

Segmented progress for a short multi-step form, with "Step 2 of 3 · Details" under it.

- One bar per step, `brand-default` up to the current step, `border-default` after it. 4px tall, `radius-full`, `space-4` apart.
- The label is `mono-xs`: the counter in `text-secondary`, the step name in `text-primary`. `showLabel={false}` hides it when the title already names the step.
- Three steps or fewer. A longer form should be one scroll with optional sections (Disclosure), not a longer stepper.
- Put it above the dialog title (Modal `eyebrow`) or at the top of a BottomSheet. It isn't navigation: steps are not clickable; Back is a `ghost` button in the footer.
