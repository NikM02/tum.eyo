import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Sliders
  await prisma.slider.createMany({
    data: [
      { title: 'Crafting Digital Experiences', subtitle: 'We build custom solutions that transform your brand identity and drive measurable results.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80', order: 0, active: true },
      { title: 'Innovation Meets Strategy', subtitle: 'From automation to branding, we deliver end-to-end digital transformation.', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80', order: 1, active: true },
      { title: 'Your Vision, Our Expertise', subtitle: 'Custom solutions tailored to your unique business needs and goals.', imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80', order: 2, active: true },
    ],
  })

  // Seed About
  await prisma.about.create({
    data: {
      heading: 'We Create Tailored Digital Solutions',
      description: 'At NexaCraft, we don\'t believe in one-size-fits-all. Every brand is unique, and so should be its digital presence. We specialize in crafting bespoke digital experiences that align perfectly with your brand\'s vision, values, and goals.\n\nOur team of creative strategists, designers, and developers work collaboratively to deliver solutions that not only look stunning but also drive real business results. From initial concept to final deployment, every pixel and every line of code is customized to reflect your brand\'s unique identity.\n\nWe combine cutting-edge technology with creative innovation to build digital solutions that set you apart from the competition.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      stat1Label: 'Projects Delivered', stat1Value: '150+',
      stat2Label: 'Happy Clients', stat2Value: '80+',
      stat3Label: 'Years Experience', stat3Value: '10+',
    },
  })

  // Seed Portfolio
  await prisma.portfolio.createMany({
    data: [
      { title: 'Brand Identity Redesign', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', order: 0 },
      { title: 'E-Commerce Platform', category: 'Web Development', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', order: 1 },
      { title: 'Social Media Campaign', category: 'Digital Marketing', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', order: 2 },
      { title: 'Workflow Automation', category: 'Automation', imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80', order: 3 },
      { title: 'Corporate Website', category: 'Web Design', imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80', order: 4 },
      { title: 'Product Launch Campaign', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80', order: 5 },
    ],
  })

  // Seed FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: 'What services does NexaCraft offer?', answer: 'We offer a comprehensive suite of digital services including Digital Marketing, Branding, Website Design & Development, and Business Automation. Each service is fully customized to meet your specific business needs.', order: 0, active: true },
      { question: 'How long does a typical project take?', answer: 'Project timelines vary based on complexity and scope. A branding project typically takes 2-4 weeks, website development 4-8 weeks, and comprehensive digital marketing campaigns are ongoing with monthly reporting.', order: 1, active: true },
      { question: 'Do you offer custom solutions or use templates?', answer: 'We pride ourselves on creating 100% custom solutions. We never use templates. Every design, every strategy, and every line of code is crafted specifically for your brand and business objectives.', order: 2, active: true },
      { question: 'What is your pricing structure?', answer: 'Our pricing is project-based and depends on the scope and complexity of your requirements. We provide detailed proposals with transparent pricing after our initial consultation. Contact us for a free quote.', order: 3, active: true },
      { question: 'Do you provide ongoing support after project completion?', answer: 'Absolutely! We offer comprehensive post-launch support and maintenance packages. We believe in building long-term partnerships with our clients to ensure continued success.', order: 4, active: true },
    ],
  })

  console.log('Database seeded successfully!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
