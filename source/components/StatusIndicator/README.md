# StatusIndicator

Live-chat availability in the header top bar: a green dot and "WE'RE ONLINE".

- The dot breathes with a soft green glow (3.2s) and a light glint passes over it diagonally about every 7 seconds. Both stop under `prefers-reduced-motion` and with `static`.
- `online={false}` renders nothing: the offline state is not shown, so the header doesn't draw attention to it.
- Props: `online` (default true), `label` (default "We're online"), `static`.
