export type InsightsResource = {
  id: number
  title: string
  type: string
  description: string
  image: string
  downloadLink: string
  downloadFileName: string
}

export const INSIGHTS_RESOURCES: InsightsResource[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    type: 'E-Book',
    description: 'End-to-end web development concepts, tools, and practices in one downloadable guide.',
    image: '/ebbook.jpg',
    downloadLink: '/api/resource-pdf?key=fullstack',
    downloadFileName: 'fullstack development.pdf',
  },
  {
    id: 2,
    title: 'Cloud Computing',
    type: 'E-Book',
    description: 'Foundations and patterns for building and operating workloads in the cloud.',
    image: '/cloud.jpg',
    downloadLink: '/api/resource-pdf?key=cloud',
    downloadFileName: 'Cloud-Computing.pdf',
  },
  {
    id: 3,
    title: 'User Experience Design',
    type: 'E-Book',
    description: 'UX principles and methods for designing clear, usable digital products.',
    image: '/UX.jpg',
    downloadLink: '/api/resource-pdf?key=ux',
    downloadFileName: 'User-Experience Design.pdf',
  },
  {
    id: 4,
    title: 'Programming',
    type: 'E-Book',
    description: 'Core programming concepts and techniques for building reliable software.',
    image: '/API.jpg',
    downloadLink: '/api/resource-pdf?key=programming',
    downloadFileName: 'Programming.pdf',
  },
]
