import ToolCard from "@/components/ToolCard"

const securityTools = [
  { name: "Password Generator", description: "Generate secure random passwords with customizable options", icon: "🔐", href: "/tools/security/password-generator", category: "security" },
  { name: "UUID Generator", description: "Generate random UUIDs (v4) in bulk", icon: "🎫", href: "/tools/security/uuid-generator", category: "security" },
  { name: "Base64 Encoder/Decoder", description: "Encode and decode text to/from Base64", icon: "🔢", href: "/tools/security/base64", category: "security" },
  { name: "URL Encoder/Decoder", description: "Encode and decode URLs safely", icon: "🌐", href: "/tools/security/url-encoder", category: "security" },
  { name: "HTML Encoder/Decoder", description: "Encode and decode HTML entities", icon: "📄", href: "/tools/security/html-encoder", category: "security" },
  { name: "Hash Generator", description: "Generate SHA-256 hashes (client-side)", icon: "🔒", href: "/tools/security/hash", category: "security" },
  { name: "JSON Escape/Unescape", description: "Escape and unescape JSON strings", icon: "{ }", href: "/tools/security/json-escape", category: "security" },
  { name: "Random Number Generator", description: "Generate random numbers within a range", icon: "🎲", href: "/tools/security/random-number", category: "security" },
  { name: "Color Contrast Checker", description: "Check WCAG color contrast ratio for accessibility", icon: "🎨", href: "/tools/security/contrast", category: "security" },
  { name: "Text Checksum", description: "Calculate simple checksums for text", icon: "✅", href: "/tools/security/checksum", category: "security" },
]

export default function SecurityToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔐 Security Tools</h1>
        <p className="text-gray-400">Password generator, encoding, hashing, and security utilities</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </div>
  )
}
