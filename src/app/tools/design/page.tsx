import ToolCard from "@/components/ToolCard"

const designTools = [
  { name: "Color Picker", description: "Pick colors and see HEX, RGB, HSL formats instantly", icon: "🎯", href: "/tools/design/color-picker", category: "design" },
  { name: "Gradient Generator", description: "Create beautiful CSS gradients with preview", icon: "🌈", href: "/tools/design/gradient-generator", category: "design" },
  { name: "Color Palette Generator", description: "Generate matching color shades from a base color", icon: "🎭", href: "/tools/design/palette-generator", category: "design" },
  { name: "CSS Shadow Generator", description: "Create box-shadow and text-shadow with live preview", icon: "🕶️", href: "/tools/design/shadow-generator", category: "design" },
  { name: "Color Converter", description: "Convert between HEX, RGB, and HSL color formats", icon: "🔄", href: "/tools/design/color-converter", category: "design" },
  { name: "Complementary Colors", description: "Find complementary, triadic colors for any hex", icon: "🎪", href: "/tools/design/complementary", category: "design" },
  { name: "Random Color Generator", description: "Generate random colors with hex codes", icon: "🎲", href: "/tools/design/random-color", category: "design" },
  { name: "Random Palette", description: "Generate random beautiful color palettes", icon: "✨", href: "/tools/design/random-palette", category: "design" },
]

export default function DesignToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎨 Design Tools</h1>
        <p className="text-gray-400">Color picker, gradient generator, palette tools, and CSS utilities</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
