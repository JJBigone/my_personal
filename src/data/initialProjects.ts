import type { Project } from '../types/portfolio';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'unit1-sdlc-concept',
    title: 'การพัฒนาระบบสารสนเทศและ SDLC',
    slug: 'information-systems-development-sdlc',
    short_description: 'เอกสารคู่มือและเนื้อหาการพัฒนาระบบสารสนเทศตามวงจรการพัฒนาระบบ (System Development Life Cycle)',
    description: `เอกสารการเรียนรู้และคู่มือฉบับสมบูรณ์ เรื่อง การพัฒนาระบบสารสนเทศและวงจรการพัฒนาระบบ (SDLC - System Development Life Cycle)

ครอบคลุมเนื้อหาสำคัญ:
1. ความหมายและความสำคัญของระบบสารสนเทศ
2. ขั้นตอนในวงจรการพัฒนาระบบ (SDLC): การวางแผน, การวิเคราะห์ความต้องการ, การออกแบบระบบ, การพัฒนาและทดสอบ, การติดตั้งใช้งาน และการบำรุงรักษา
3. การประยุกต์ใช้เพื่อการพัฒนาซอฟต์แวร์และระบบสารสนเทศเชิงธุรกิจจริง`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['SDLC', 'ระบบสารสนเทศ', 'หน่วยการเรียนรู้ที่ 1', 'เอกสารประกอบการเรียน'],
    cover_image_url: '/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png',
    project_url: '/workshops/การพัฒนาระบบสารสนเทศและ_SDLC.pdf',
    technologies: ['Systems Analysis', 'SDLC', 'Information Systems', 'Documentation'],
    is_featured: true,
    status: 'published',
    created_at: new Date('2026-10-26T12:11:52').toISOString(),
    updated_at: new Date('2026-10-26T12:11:52').toISOString(),
    published_at: new Date('2026-10-26T12:11:52').toISOString()
  },
  {
    id: 'unit1-strategic-guide',
    title: 'Strategic Information Systems Development Guide',
    slug: 'strategic-information-systems-development-guide',
    short_description: 'คู่มือเชิงกลยุทธ์การพัฒนาระบบสารสนเทศเพื่อตอบสนองต่อเป้าหมายทางธุรกิจและองค์กรสมัยใหม่',
    description: `คู่มือเชิงกลยุทธ์ (Strategic Guide) สำหรับการพัฒนาระบบสารสนเทศ:
- แนวคิดเชิงกลยุทธ์ในการวิเคราะห์และจัดทำสถาปัตยกรรมสารสนเทศ
- การบูรณาการกระบวนการทางธุรกิจเข้ากับเทคโนโลยีดิจิทัล
- การบริหารความเสี่ยงและการประเมินความเป็นไปได้ของโครงการพัฒนาระบบ`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['Strategic Planning', 'Information Systems', 'SDLC', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png',
    project_url: '/workshops/Strategic_Information_Systems_Development_Guide.pdf',
    technologies: ['Strategic Management', 'System Architecture', 'Enterprise Systems'],
    is_featured: true,
    status: 'published',
    created_at: new Date('2026-10-26T10:33:05').toISOString(),
    updated_at: new Date('2026-10-26T10:33:05').toISOString(),
    published_at: new Date('2026-10-26T10:33:05').toISOString()
  },
  {
    id: 'unit1-infographic-sdlc',
    title: 'อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC',
    slug: 'infographic-information-systems-sdlc',
    short_description: 'ภาพรวมขั้นตอนและลำดับการทำงานของวงจรการพัฒนาระบบสารสนเทศ (SDLC) ในรูปแบบ Infographic อ่านเข้าใจง่าย',
    description: `สื่ออินโฟกราฟิกสรุปขั้นตอนการพัฒนาระบบสารสนเทศ (SDLC):
- สรุปกระบวนการ 7 ขั้นตอนของ SDLC อย่างเป็นลำดับขั้นตอน
- การแสดง Flow การส่งมอบงานระหว่างนักวิเคราะห์ระบบและนักพัฒนาระบบ
- เหมาะสำหรับการทบทวนและทำความเข้าใจภาพรวมของระบบสารสนเทศ`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['Infographic', 'SDLC', 'สื่อการสอน', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png',
    project_url: '/workshops/อินโฟกราฟิกการพัฒนาระบบสารสนเทศ SDLC.png',
    technologies: ['Visual Design', 'Information Design', 'SDLC Flowchart'],
    is_featured: true,
    status: 'published',
    created_at: new Date('2026-10-26T09:34:29').toISOString(),
    updated_at: new Date('2026-10-26T09:34:29').toISOString(),
    published_at: new Date('2026-10-26T09:34:29').toISOString()
  },
  {
    id: 'unit1-quiz-pastel',
    title: 'แบบทดสอบระบบสารสนเทศโทนพาสเทล',
    slug: 'quiz-information-systems-pastel',
    short_description: 'แบบประเมินและทดสอบความรู้ความเข้าใจเกี่ยวกับการพัฒนาระบบสารสนเทศ ดีไซน์โทนพาสเทลสบายตา',
    description: `แบบทดสอบวัดผลการเรียนรู้ หน่วยการเรียนรู้ที่ 1 การพัฒนาระบบสารสนเทศ:
- แบบทดสอบวัดความเข้าใจเรื่องความหมายและองค์ประกอบของสารสนเทศ
- คำถามทบทวนขั้นตอนและบทบาทหน้าที่ในกระบวนการ SDLC
- ออกแบบสื่อการประเมินผลในโทนสีพาสเทลสวยงาม สะอาดตา`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['แบบทดสอบ', 'ประเมินผล', 'หน่วยการเรียนรู้ที่ 1', 'Pastel Design'],
    cover_image_url: '/workshops/แบบทดสอบระบบสารสนเทศโทนพาสเทล.png',
    project_url: '/workshops/แบบทดสอบระบบสารสนเทศโทนพาสเทล.png',
    technologies: ['Quiz Assessment', 'Graphic Design', 'Pastel Palette'],
    is_featured: false,
    status: 'published',
    created_at: new Date('2026-10-26T12:12:35').toISOString(),
    updated_at: new Date('2026-10-26T12:12:35').toISOString(),
    published_at: new Date('2026-10-26T12:12:35').toISOString()
  },
  {
    id: 'unit1-worksheet',
    title: 'แผ่นงานพัฒนาระบบสารสนเทศ',
    slug: 'worksheet-information-systems-development',
    short_description: 'ใบงานและแบบฝึกปฏิบัติการวิเคราะห์ความต้องการและการวางแผนพัฒนาระบบสารสนเทศ',
    description: `แผ่นงานฝึกปฏิบัติ (Worksheet) สำหรับนักศึกษา:
- กิจกรรมการวิเคราะห์โจทย์ปัญหาและความต้องการของผู้ใช้งาน (Requirement Analysis)
- แผ่นงานระบุขั้นตอนและกิจกรรมในแต่ละเฟสของ SDLC
- ส่งเสริมการคิดวิเคราะห์เชิงระบบและการทำงานร่วมกันเป็นทีม`,
    category: 'การพัฒนาระบบสารสนเทศ หน่วยการเรียนรู้ที่ 1',
    tags: ['แผ่นงาน', 'ใบงาน', 'ฝึกปฏิบัติ', 'หน่วยการเรียนรู้ที่ 1'],
    cover_image_url: '/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png',
    project_url: '/workshops/แผ่นงานพัฒนาระบบสารสนเทศ.png',
    technologies: ['Worksheet', 'Practical Activity', 'System Analysis'],
    is_featured: false,
    status: 'published',
    created_at: new Date('2026-10-26T12:12:38').toISOString(),
    updated_at: new Date('2026-10-26T12:12:38').toISOString(),
    published_at: new Date('2026-10-26T12:12:38').toISOString()
  }
];
