import type { Project } from '../types/portfolio';

export const INITIAL_PROJECTS: Project[] = [
  // 1. งานแรก (สไลด์ใหญ่สุด)
  {
    id: 'unit1-sdlc-pptx',
    title: 'การพัฒนาระบบสารสนเทศและ SDLC (สไลด์ประกอบการบรรยาย)',
    slug: 'information-systems-development-sdlc-slide',
    short_description: 'สไลด์ประกอบการเรียนรู้และนำเสนอ เรื่องการพัฒนาระบบสารสนเทศและวงจรการพัฒนาระบบ (SDLC) ฉบับสมบูรณ์',
    description: `เอกสารสไลด์นำเสนอฉบับสมบูรณ์ (PowerPoint Presentation) เรื่อง "การพัฒนาระบบสารสนเทศและ SDLC"

ครอบคลุมหัวข้อสำคัญ:
- ความหมาย วัตถุประสงค์ และบทบาทของระบบสารสนเทศในองค์กร
- วงจรการพัฒนาระบบ (System Development Life Cycle - SDLC) ทั้ง 7 ขั้นตอน
- รายละเอียดหน้าที่ของนักวิเคราะห์ระบบ (SA) และทีมงานพัฒนา
- มีทั้งไฟล์สไลด์นำเสนอ (.pptx) สำหรับดาวน์โหลด และเอกสาร PDF สำหรับเปิดอ่านบนเบราว์เซอร์ได้ทันที`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['สไลด์นำเสนอ', 'SDLC', 'PowerPoint', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/sdlc-slide-cover.png',
    gallery_images: [
      '/workshops/sdlc-slides/slide-1.png',
      '/workshops/sdlc-slides/slide-2.png',
      '/workshops/sdlc-slides/slide-3.png',
      '/workshops/sdlc-slides/slide-4.png',
      '/workshops/sdlc-slides/slide-5.png',
      '/workshops/sdlc-slides/slide-6.png',
      '/workshops/sdlc-slides/slide-7.png',
      '/workshops/sdlc-slides/slide-8.png',
      '/workshops/sdlc-slides/slide-9.png',
      '/workshops/sdlc-slides/slide-10.png',
      '/workshops/sdlc-slides/slide-11.png',
      '/workshops/sdlc-slides/slide-12.png',
      '/workshops/sdlc-slides/slide-13.png',
      '/workshops/sdlc-slides/slide-14.png',
      '/workshops/sdlc-slides/slide-15.png',
      '/workshops/sdlc-slides/slide-16.png',
      '/workshops/sdlc-slides/slide-17.png'
    ],
    project_url: '/workshops/การพัฒนาระบบสารสนเทศและ_SDLC.pdf',
    source_code_url: '/workshops/การพัฒนาระบบสารสนเทศและ_SDLC.pptx',
    technologies: ['PowerPoint (.pptx)', 'Interactive Slides', 'System Analysis', 'SDLC'],
    is_featured: true,
    status: 'published',
    created_at: new Date('2026-10-26T13:00:00').toISOString(),
    updated_at: new Date('2026-10-26T13:00:00').toISOString(),
    published_at: new Date('2026-10-26T13:00:00').toISOString()
  },
  // 2. งานสอง
  {
    id: 'unit1-infographic-sdlc',
    title: 'อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC',
    slug: 'infographic-information-systems-sdlc',
    short_description: 'ภาพรวมขั้นตอนและลำดับการทำงานของวงจรการพัฒนาระบบสารสนเทศ (SDLC) ในรูปแบบ Infographic อ่านเข้าใจง่าย',
    description: `สื่ออินโฟกราฟิกสรุปขั้นตอนการพัฒนาระบบสารสนเทศ (SDLC):
- สรุปกระบวนการ 7 ขั้นตอนของ SDLC อย่างเป็นลำดับขั้นตอน
- การแสดง Flow การส่งมอบงานระหว่างนักวิเคราะห์ระบบและนักพัฒนาระบบ
- เหมาะสำหรับการทบทวนและทำความเข้าใจภาพรวมของระบบสารสนเทศแบบสรุปใจความสำคัญ`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['Infographic', 'SDLC', 'สื่อการสอน', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png',
    project_url: '/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png',
    technologies: ['Visual Design', 'Information Design', 'SDLC Flowchart'],
    is_featured: false,
    status: 'published',
    created_at: new Date('2026-10-26T12:00:00').toISOString(),
    updated_at: new Date('2026-10-26T12:00:00').toISOString(),
    published_at: new Date('2026-10-26T12:00:00').toISOString()
  },
  // 3. งานสาม
  {
    id: 'unit1-worksheet',
    title: 'แผ่นงานพัฒนาระบบสารสนเทศ',
    slug: 'worksheet-information-systems-development',
    short_description: 'ใบงานและแบบฝึกปฏิบัติการวิเคราะห์ความต้องการและการวางแผนพัฒนาระบบสารสนเทศ',
    description: `แผ่นงานฝึกปฏิบัติ (Worksheet) สำหรับนักศึกษา:
- กิจกรรมการวิเคราะห์โจทย์ปัญหาและความต้องการของผู้ใช้งาน (Requirement Analysis)
- แผ่นงานระบุขั้นตอนและกิจกรรมในแต่ละเฟสของ SDLC
- ส่งเสริมการคิดวิเคราะห์เชิงระบบและการทำงานจริงอย่างเป็นขั้นตอน`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['แผ่นงาน', 'ใบงาน', 'ฝึกปฏิบัติ', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png',
    project_url: '/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png',
    technologies: ['Worksheet', 'Practical Activity', 'System Analysis'],
    is_featured: false,
    status: 'published',
    created_at: new Date('2026-10-26T11:00:00').toISOString(),
    updated_at: new Date('2026-10-26T11:00:00').toISOString(),
    published_at: new Date('2026-10-26T11:00:00').toISOString()
  },
  // 4. งานสี่
  {
    id: 'unit1-quiz-pastel',
    title: 'แบบทดสอบระบบสารสนเทศโทนพาสเทล',
    slug: 'quiz-information-systems-pastel',
    short_description: 'แบบประเมินและทดสอบความรู้ความเข้าใจเกี่ยวกับการพัฒนาระบบสารสนเทศ ดีไซน์โทนพาสเทลสบายตา',
    description: `แบบทดสอบวัดผลการเรียนรู้ หน่วยการเรียนรู้ที่ 1 การพัฒนาระบบสารสนเทศ:
- แบบทดสอบวัดความเข้าใจเรื่องความหมายและองค์ประกอบของสารสนเทศ
- คำถามทบทวนขั้นตอนและบทบาทหน้าที่ในกระบวนการ SDLC
- ออกแบบสื่อการประเมินผลในโทนสีพาสเทลสวยงาม สะอาดตา อ่านง่าย`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['แบบทดสอบ', 'ประเมินผล', 'หน่วยการเรียนรู้ที่ 1', 'Pastel Design'],
    cover_image_url: '/workshops/แบบทดสอบระบบสารสนเทศโทนพาสเทล.png',
    project_url: '/workshops/แบบทดสอบระบบสารสนเทศโทนพาสเทล.png',
    technologies: ['Quiz Assessment', 'Graphic Design', 'Pastel Palette'],
    is_featured: false,
    status: 'published',
    created_at: new Date('2026-10-26T10:00:00').toISOString(),
    updated_at: new Date('2026-10-26T10:00:00').toISOString(),
    published_at: new Date('2026-10-26T10:00:00').toISOString()
  }
];
