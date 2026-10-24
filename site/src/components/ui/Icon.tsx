import { Lightbulb, Code, Brain, BarChart3 } from 'lucide-react'

const icons = { Lightbulb, Code, Brain, BarChart: BarChart3 }

export type IconName = keyof typeof icons

export default function Icon({
  name,
  ...props
}: { name: IconName } & React.ComponentProps<typeof Code>) {
  const Component = icons[name]
  return <Component aria-hidden="true" {...props} />
}
