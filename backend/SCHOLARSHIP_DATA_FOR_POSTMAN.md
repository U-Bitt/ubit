# Complete Scholarship Data for Postman API Testing

## API Endpoint
**POST** `http://localhost:5001/api/scholarships`

## Headers
```
Content-Type: application/json
```

---

## 1. MIT Presidential Scholarship (Original)
```json
{
  "title": "MIT Presidential Scholarship",
  "description": "Full tuition scholarship for outstanding international students at MIT",
  "amount": "$57,986",
  "university": "Massachusetts Institute of Technology",
  "country": "United States",
  "deadline": "2025-01-15",
  "requirements": ["Academic excellence", "Leadership potential", "Financial need"],
  "type": "Merit-based",
  "coverage": "Full tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with essays and recommendations",
  "eligibility": "International students with exceptional academic records",
  "benefits": ["Full tuition coverage", "Research opportunities", "Mentorship program"],
  "image": "/mit-campus-aerial.png"
}
```

## 2. Stanford Knight-Hennessy Scholars (Original)
```json
{
  "title": "Stanford Knight-Hennessy Scholars",
  "description": "Graduate scholarship program for future global leaders",
  "amount": "$75,000",
  "university": "Stanford University",
  "country": "United States",
  "deadline": "2025-10-10",
  "requirements": ["Graduate degree", "Leadership experience", "Global perspective"],
  "type": "Leadership-based",
  "coverage": "Full funding",
  "duration": "2-3 years",
  "applicationProcess": "Multi-stage application with interviews",
  "eligibility": "Graduate students from any country",
  "benefits": ["Full funding", "Leadership development", "Global network"],
  "image": "/stanford-campus.jpg"
}
```

## 3. Oxford Clarendon Scholarship (Original)
```json
{
  "title": "Oxford Clarendon Scholarship",
  "description": "Fully-funded graduate scholarship at Oxford University",
  "amount": "£15,000",
  "university": "University of Oxford",
  "country": "United Kingdom",
  "deadline": "2025-01-20",
  "requirements": ["First-class degree", "Research potential", "Academic excellence"],
  "type": "Merit-based",
  "coverage": "Full funding",
  "duration": "3-4 years",
  "applicationProcess": "Departmental application with research proposal",
  "eligibility": "Graduate students worldwide",
  "benefits": ["Full funding", "Research support", "Academic community"],
  "image": "/oxford-university-campus.jpg"
}
```

## 4. Cambridge Gates Scholarship (Original)
```json
{
  "title": "Cambridge Gates Scholarship",
  "description": "Full-cost scholarship for graduate study at Cambridge",
  "amount": "£20,000",
  "university": "University of Cambridge",
  "country": "United Kingdom",
  "deadline": "2025-10-15",
  "requirements": ["Academic excellence", "Leadership potential", "Social commitment"],
  "type": "Merit-based",
  "coverage": "Full funding",
  "duration": "1-3 years",
  "applicationProcess": "University application plus Gates application",
  "eligibility": "Graduate students from outside the UK",
  "benefits": ["Full funding", "Leadership development", "Global community"],
  "image": "/cambridge-university-campus.jpg"
}
```

## 5. Harvard Presidential Scholarship (Original)
```json
{
  "title": "Harvard Presidential Scholarship",
  "description": "Undergraduate scholarship for exceptional international students",
  "amount": "$54,269",
  "university": "Harvard University",
  "country": "United States",
  "deadline": "2025-01-01",
  "requirements": ["Academic excellence", "Extracurricular achievements", "Character"],
  "type": "Merit-based",
  "coverage": "Full tuition",
  "duration": "4 years",
  "applicationProcess": "Standard Harvard application",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Full tuition", "Research opportunities", "Alumni network"],
  "image": "/harvard-campus.jpg"
}
```

## 6. Lester B. Pearson International Scholarship (Original)
```json
{
  "title": "Lester B. Pearson International Scholarship",
  "description": "Fully-funded undergraduate scholarship for international students at University of Toronto, covering tuition, living expenses, and books for up to 4 years. This prestigious scholarship recognizes academic excellence, leadership potential, and community involvement.",
  "amount": "Full funding",
  "university": "University of Toronto",
  "country": "Canada",
  "deadline": "2025-11-30",
  "requirements": [
    "High school graduate entering undergraduate",
    "International (non-Canadian) student",
    "Minimum GPA 3.7",
    "English proficiency (IELTS 7.0+, TOEFL 100+, Duolingo 120+)",
    "Personal Essay/Statement",
    "Recommendation Letters",
    "Official Transcript",
    "Proof of English Proficiency"
  ],
  "type": "Merit-based",
  "coverage": "100% tuition, living expenses, books and supplies",
  "duration": "Up to 4 years",
  "applicationProcess": "Nominated by high school and apply through university. Multi-stage application with essays, recommendations, and academic records.",
  "eligibility": "International (non-Canadian) high school graduates entering undergraduate studies. Must demonstrate academic excellence, leadership potential, community involvement, and innovation.",
  "benefits": [
    "100% tuition coverage",
    "Living expenses covered",
    "Books and supplies covered",
    "Leadership development opportunities",
    "Global community access",
    "Research opportunities",
    "Mentorship program"
  ],
  "image": "/university-of-toronto-campus.png",
  "donor": "University of Toronto",
  "contactEmail": "international.admissions@utoronto.ca",
  "website": "https://future.utoronto.ca/pearson/about/"
}
```

---

## 7. MIT Presidential Scholarship (University-Specific)
```json
{
  "title": "MIT Presidential Scholarship",
  "description": "Full tuition scholarship for outstanding international students at MIT, recognizing exceptional academic achievement and leadership potential.",
  "amount": "$57,986",
  "university": "Massachusetts Institute of Technology",
  "country": "United States",
  "deadline": "2025-01-15",
  "requirements": [
    "Academic excellence (3.9+ GPA)",
    "Leadership potential",
    "Financial need",
    "International student status",
    "SAT 1500+ or ACT 34+",
    "Research experience",
    "Personal essay",
    "Two recommendation letters"
  ],
  "type": "Merit-based",
  "coverage": "Full tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with essays, recommendations, and academic records. Finalist interviews required.",
  "eligibility": "International students with exceptional academic records and demonstrated leadership potential.",
  "benefits": [
    "Full tuition coverage",
    "Research opportunities",
    "Mentorship program",
    "Alumni network access",
    "Conference funding",
    "Internship support"
  ],
  "image": "/mit-campus-aerial.png",
  "donor": "MIT Office of the President",
  "contactEmail": "presidential-scholarship@mit.edu",
  "website": "https://web.mit.edu/finaid/scholarships/presidential.html"
}
```

## 8. MIT Engineering Excellence Scholarship
```json
{
  "title": "MIT Engineering Excellence Scholarship",
  "description": "Merit-based scholarship for students pursuing engineering degrees with demonstrated innovation and technical excellence.",
  "amount": "$25,000",
  "university": "Massachusetts Institute of Technology",
  "country": "United States",
  "deadline": "2025-02-28",
  "requirements": [
    "Engineering major",
    "3.8+ GPA",
    "Leadership experience",
    "Community service",
    "Technical project portfolio",
    "Innovation proposal"
  ],
  "type": "Merit-based",
  "coverage": "Partial tuition",
  "duration": "4 years",
  "applicationProcess": "Application with portfolio, essay, and recommendations.",
  "eligibility": "Undergraduate engineering students with strong academic and leadership records.",
  "benefits": [
    "Partial tuition coverage",
    "Research lab access",
    "Industry mentorship",
    "Conference attendance",
    "Project funding"
  ],
  "image": "/mit-campus-aerial.png",
  "donor": "MIT Engineering School",
  "contactEmail": "engineering-scholarships@mit.edu",
  "website": "https://engineering.mit.edu/financial-aid"
}
```

## 9. Stanford Knight-Hennessy Scholars (University-Specific)
```json
{
  "title": "Stanford Knight-Hennessy Scholars",
  "description": "Graduate scholarship program for future global leaders, providing full funding for graduate study at Stanford.",
  "amount": "$75,000",
  "university": "Stanford University",
  "country": "United States",
  "deadline": "2025-10-10",
  "requirements": [
    "Graduate degree program",
    "Leadership experience",
    "Global perspective",
    "Academic excellence",
    "Innovation mindset",
    "Community impact"
  ],
  "type": "Leadership-based",
  "coverage": "Full funding",
  "duration": "2-3 years",
  "applicationProcess": "Multi-stage application with essays, interviews, and leadership assessment.",
  "eligibility": "Graduate students from any country with demonstrated leadership and global perspective.",
  "benefits": [
    "Full funding",
    "Leadership development",
    "Global network",
    "Research support",
    "Conference funding",
    "Alumni mentorship"
  ],
  "image": "/stanford-campus.jpg",
  "donor": "Knight-Hennessy Scholars Program",
  "contactEmail": "knight-hennessy@stanford.edu",
  "website": "https://knight-hennessy.stanford.edu"
}
```

## 10. Stanford Computer Science Innovation Award
```json
{
  "title": "Stanford Computer Science Innovation Award",
  "description": "Scholarship for students developing cutting-edge AI and technology solutions with entrepreneurial potential.",
  "amount": "$20,000",
  "university": "Stanford University",
  "country": "United States",
  "deadline": "2025-06-10",
  "requirements": [
    "Computer Science major",
    "AI/ML project",
    "Entrepreneurial experience",
    "Technical innovation",
    "Startup potential"
  ],
  "type": "Merit-based",
  "coverage": "Partial funding",
  "duration": "1 year",
  "applicationProcess": "Application with project proposal and technical demonstration.",
  "eligibility": "Computer Science students with innovative AI/ML projects.",
  "benefits": [
    "Partial funding",
    "Startup incubation",
    "Industry mentorship",
    "Technical resources",
    "Networking opportunities"
  ],
  "image": "/stanford-campus.jpg",
  "donor": "Stanford CS Department",
  "contactEmail": "cs-scholarships@stanford.edu",
  "website": "https://cs.stanford.edu/financial-aid"
}
```

## 11. Harvard Presidential Scholarship (University-Specific)
```json
{
  "title": "Harvard Presidential Scholarship",
  "description": "Undergraduate scholarship for exceptional international students, covering full tuition and providing comprehensive support.",
  "amount": "$54,269",
  "university": "Harvard University",
  "country": "United States",
  "deadline": "2025-01-01",
  "requirements": [
    "Academic excellence",
    "Extracurricular achievements",
    "Character and leadership",
    "International student status",
    "SAT 1500+ or ACT 34+",
    "Personal statement",
    "Recommendation letters"
  ],
  "type": "Merit-based",
  "coverage": "Full tuition",
  "duration": "4 years",
  "applicationProcess": "Standard Harvard application with additional scholarship essay.",
  "eligibility": "International undergraduate applicants with exceptional academic and personal achievements.",
  "benefits": [
    "Full tuition",
    "Research opportunities",
    "Alumni network",
    "Mentorship program",
    "Study abroad funding",
    "Internship support"
  ],
  "image": "/harvard-campus.jpg",
  "donor": "Harvard Office of the President",
  "contactEmail": "presidential-scholarship@harvard.edu",
  "website": "https://college.harvard.edu/financial-aid/scholarships"
}
```

## 12. Harvard Business School Alumni Fellowship
```json
{
  "title": "Harvard Business School Alumni Fellowship",
  "description": "Supporting exceptional students from underrepresented backgrounds pursuing MBA degrees with entrepreneurial aspirations.",
  "amount": "$50,000",
  "university": "Harvard University",
  "country": "United States",
  "deadline": "2025-04-30",
  "requirements": [
    "GMAT 700+",
    "Entrepreneurial experience",
    "Underrepresented background",
    "Leadership potential",
    "Business plan",
    "Community impact"
  ],
  "type": "Need-based",
  "coverage": "Partial funding",
  "duration": "2 years",
  "applicationProcess": "MBA application plus fellowship essay and business plan.",
  "eligibility": "MBA students from underrepresented backgrounds with entrepreneurial goals.",
  "benefits": [
    "Partial funding",
    "Entrepreneurship support",
    "Alumni mentorship",
    "Startup resources",
    "Networking events"
  ],
  "image": "/harvard-campus.jpg",
  "donor": "Harvard Business School Alumni",
  "contactEmail": "hbs-fellowships@harvard.edu",
  "website": "https://www.hbs.edu/mba/financial-aid"
}
```

## 13. UCD Global Excellence Scholarship
```json
{
  "title": "UCD Global Excellence Scholarship",
  "description": "Merit-based scholarship for international students demonstrating academic excellence and leadership potential.",
  "amount": "€10,000",
  "university": "University College Dublin",
  "country": "Ireland",
  "deadline": "2025-02-01",
  "requirements": [
    "International student",
    "Academic excellence",
    "Leadership experience",
    "Community involvement",
    "English proficiency",
    "Personal statement"
  ],
  "type": "Merit-based",
  "coverage": "Partial tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with academic records and personal statement.",
  "eligibility": "International students with strong academic records and leadership potential.",
  "benefits": [
    "Partial tuition coverage",
    "Cultural integration support",
    "Mentorship program",
    "Research opportunities",
    "Career guidance"
  ],
  "image": "/ucd-campus.jpg",
  "donor": "UCD International Office",
  "contactEmail": "global-scholarships@ucd.ie",
  "website": "https://www.ucd.ie/global/scholarships"
}
```

## 14. Paris-Saclay Excellence Scholarship
```json
{
  "title": "Paris-Saclay Excellence Scholarship",
  "description": "Fully-funded scholarship for international students pursuing science and technology programs at Paris-Saclay.",
  "amount": "€12,000",
  "university": "Université Paris-Saclay",
  "country": "France",
  "deadline": "2025-03-01",
  "requirements": [
    "Science/Technology major",
    "Academic excellence",
    "Research potential",
    "International student",
    "French/English proficiency",
    "Research proposal"
  ],
  "type": "Merit-based",
  "coverage": "Full funding",
  "duration": "2-3 years",
  "applicationProcess": "Application with research proposal and academic records.",
  "eligibility": "International students in science and technology programs.",
  "benefits": [
    "Full funding",
    "Research support",
    "Laboratory access",
    "Conference funding",
    "Language courses"
  ],
  "image": "/paris-saclay-campus.jpg",
  "donor": "Paris-Saclay University",
  "contactEmail": "excellence-scholarships@universite-paris-saclay.fr",
  "website": "https://www.universite-paris-saclay.fr/en/scholarships"
}
```

## 15. Fudan International Student Scholarship
```json
{
  "title": "Fudan International Student Scholarship",
  "description": "Comprehensive scholarship for international students pursuing diverse programs at Fudan University.",
  "amount": "¥50,000",
  "university": "Fudan University",
  "country": "China",
  "deadline": "2025-12-31",
  "requirements": [
    "International student",
    "Academic excellence",
    "Cultural exchange interest",
    "Chinese/English proficiency",
    "Personal statement",
    "Recommendation letters"
  ],
  "type": "Merit-based",
  "coverage": "Partial funding",
  "duration": "4 years",
  "applicationProcess": "Online application with academic records and cultural exchange essay.",
  "eligibility": "International students interested in cultural exchange and academic excellence.",
  "benefits": [
    "Partial funding",
    "Cultural integration",
    "Language support",
    "Mentorship program",
    "Cultural activities"
  ],
  "image": "/fudan-university-campus.jpg",
  "donor": "Fudan University International Office",
  "contactEmail": "international-scholarships@fudan.edu.cn",
  "website": "https://www.fudan.edu.cn/en/scholarships"
}
```

## 16. UCL Global Undergraduate Scholarship
```json
{
  "title": "UCL Global Undergraduate Scholarship",
  "description": "Merit-based scholarship for international undergraduate students across diverse programs at UCL.",
  "amount": "£10,000",
  "university": "University College London",
  "country": "United Kingdom",
  "deadline": "2025-01-15",
  "requirements": [
    "International student",
    "Academic excellence",
    "Leadership potential",
    "Community involvement",
    "English proficiency",
    "Personal statement"
  ],
  "type": "Merit-based",
  "coverage": "Partial tuition",
  "duration": "3-4 years",
  "applicationProcess": "Online application with academic records and personal statement.",
  "eligibility": "International undergraduate students with strong academic records.",
  "benefits": [
    "Partial tuition coverage",
    "Academic support",
    "Cultural integration",
    "Mentorship program",
    "Career guidance"
  ],
  "image": "/ucl-campus.jpg",
  "donor": "UCL International Office",
  "contactEmail": "global-scholarships@ucl.ac.uk",
  "website": "https://www.ucl.ac.uk/scholarships"
}
```

## 17. Imperial Engineering Excellence Scholarship
```json
{
  "title": "Imperial Engineering Excellence Scholarship",
  "description": "Merit-based scholarship for students pursuing engineering and science programs with innovation focus.",
  "amount": "£15,000",
  "university": "Imperial College London",
  "country": "United Kingdom",
  "deadline": "2025-01-15",
  "requirements": [
    "Engineering/Science major",
    "Academic excellence",
    "Innovation potential",
    "Research interest",
    "Technical skills",
    "Project portfolio"
  ],
  "type": "Merit-based",
  "coverage": "Partial funding",
  "duration": "3-4 years",
  "applicationProcess": "Application with project portfolio and technical demonstration.",
  "eligibility": "Engineering and science students with innovation potential.",
  "benefits": [
    "Partial funding",
    "Research opportunities",
    "Laboratory access",
    "Industry connections",
    "Innovation support"
  ],
  "image": "/imperial-college-campus.jpg",
  "donor": "Imperial College Engineering Faculty",
  "contactEmail": "engineering-scholarships@imperial.ac.uk",
  "website": "https://www.imperial.ac.uk/engineering/scholarships"
}
```

---

## Summary
- **Total Scholarships**: 17
- **Universities Covered**: 8 (MIT, Stanford, Harvard, UCD, Paris-Saclay, Fudan, UCL, Imperial)
- **Countries Covered**: 5 (USA, Ireland, France, China, UK)
- **Scholarship Types**: Merit-based (13), Leadership-based (1), Need-based (1)
- **Coverage Types**: Full funding (6), Partial funding (11)

## Usage Instructions
1. Copy each JSON object above
2. Set up Postman with POST request to `http://localhost:5001/api/scholarships`
3. Set Content-Type header to `application/json`
4. Paste each scholarship JSON in the request body
5. Send the request to add each scholarship to the database