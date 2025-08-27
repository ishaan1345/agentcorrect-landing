export default function FooterBar() {
  const links = [
    { name: 'Docs', href: '/docs' },
    { name: 'GitHub', href: 'https://github.com/agentcorrect' },
    { name: 'Security', href: '/security' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

  return (
    <footer className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">AgentCorrect</h3>
            <p className="text-neutral-400 text-sm">
              Deterministic, offline agent disaster detection
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} AgentCorrect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}