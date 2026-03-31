import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как скачать приложение?",
    answer:
      "Приложение доступно в App Store и Google Play. Просто найдите нашу кофейню по названию или перейдите по ссылке на сайте. После установки зарегистрируйтесь — и ваши бонусы уже ждут вас.",
  },
  {
    question: "Как работает программа лояльности?",
    answer:
      "За каждый заказ вы получаете бонусные баллы. Накопите 10 штампов — и следующий кофе за наш счёт. Также вас ждут приятные сюрпризы в день рождения и специальные акции для постоянных гостей.",
  },
  {
    question: "Как забронировать столик?",
    answer:
      "В приложении выберите раздел «Бронирование», укажите дату, время и количество гостей. Подтверждение придёт мгновенно. Бронь действует 15 минут после выбранного времени.",
  },
  {
    question: "Как долго доставляют заказ?",
    answer:
      "В среднем доставка занимает 30–45 минут в зависимости от вашего района. Вы можете отслеживать статус заказа в реальном времени прямо в приложении.",
  },
  {
    question: "Можно ли изменить или отменить заказ?",
    answer:
      "Да, заказ можно изменить или отменить в течение 5 минут после оформления. Для этого зайдите в раздел «Мои заказы» и нажмите «Изменить».",
  },
  {
    question: "Как оплатить заказ?",
    answer:
      "Принимаем карты, Apple Pay, Google Pay и бонусные баллы. Оплата проходит безопасно прямо в приложении — никаких лишних шагов.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
