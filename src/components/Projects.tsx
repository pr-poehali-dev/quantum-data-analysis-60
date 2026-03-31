import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const menuItems = [
  {
    id: 1,
    title: "Фирменный латте",
    category: "Кофейные напитки",
    location: "с карамелью и морской солью",
    year: "320 ₽",
    image: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Авторский капучино",
    category: "Кофейные напитки",
    location: "двойной эспрессо, молоко oat",
    year: "290 ₽",
    image: "/images/hously-2.png",
  },
  {
    id: 3,
    title: "Завтрак «Утро»",
    category: "Еда",
    location: "яйца, авокадо, тост с бриошью",
    year: "490 ₽",
    image: "/images/hously-3.png",
  },
  {
    id: 4,
    title: "Фруктовый смузи",
    category: "Безалкогольные напитки",
    location: "манго, маракуйя, кокос",
    year: "380 ₽",
    image: "/images/hously-4.png",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(menuItems[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранное меню</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши хиты</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть полное меню
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {menuItems.map((item, index) => (
            <article
              key={item.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === item.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(item.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.category} · {item.location}
                  </p>
                </div>
                <span className="text-foreground font-medium text-sm">{item.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
