# International Bachelor Student Scholarship Data

## API Endpoint
**POST** `http://localhost:5001/api/scholarships`

## Headers
```
Content-Type: application/json
```

---

## China Universities

### 1. Peking University - Chinese Government Scholarship
```json
{
  "title": "Chinese Government Scholarship - Peking University",
  "description": "Full scholarship for international undergraduate students at Peking University",
  "amount": "Full tuition + living allowance",
  "university": "Peking University",
  "country": "China",
  "deadline": "2025-03-31",
  "requirements": ["High school diploma", "HSK Level 4", "Academic excellence", "Health certificate"],
  "type": "Government-funded",
  "coverage": "Full tuition + accommodation + living allowance",
  "duration": "4 years",
  "applicationProcess": "Online application through CSC portal",
  "eligibility": "Non-Chinese citizens, under 25 years old",
  "benefits": ["Full tuition", "Accommodation", "Living allowance", "Medical insurance"],
  "image": "/peking.jpeg",
  "donor": "Chinese Government",
  "contactEmail": "scholarship@pku.edu.cn",
  "website": "https://english.pku.edu.cn/scholarships"
}
```

### 2. Tsinghua University - International Student Scholarship
```json
{
  "title": "Tsinghua International Student Scholarship",
  "description": "Merit-based scholarship for outstanding international undergraduate students",
  "amount": "50-100% tuition coverage",
  "university": "Tsinghua University",
  "country": "China",
  "deadline": "2025-03-15",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Community service"],
  "type": "Merit-based",
  "coverage": "50-100% tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Research opportunities", "Cultural activities"],
  "image": "/tsinghua.jpeg",
  "donor": "Tsinghua University",
  "contactEmail": "admissions@tsinghua.edu.cn",
  "website": "https://www.tsinghua.edu.cn/en/scholarships"
}
```

### 3. Fudan University - International Excellence Scholarship
```json
{
  "title": "Fudan International Excellence Scholarship",
  "description": "Comprehensive scholarship for international students pursuing undergraduate programs",
  "amount": "Full funding",
  "university": "Fudan University",
  "country": "China",
  "deadline": "2025-04-30",
  "requirements": ["Academic excellence", "English/Chinese proficiency", "Personal statement", "Recommendation letters"],
  "type": "Merit-based",
  "coverage": "Full tuition + accommodation + living allowance",
  "duration": "4 years",
  "applicationProcess": "Online application with interview",
  "eligibility": "International undergraduate students",
  "benefits": ["Full funding", "Cultural integration", "Mentorship program"],
  "image": "/Fudan University.jpeg",
  "donor": "Fudan University",
  "contactEmail": "international@fudan.edu.cn",
  "website": "https://www.fudan.edu.cn/en/scholarships"
}
```

## Japan Universities

### 4. University of Tokyo - MEXT Scholarship
```json
{
  "title": "MEXT Scholarship - University of Tokyo",
  "description": "Japanese government scholarship for international undergraduate students",
  "amount": "Full funding",
  "university": "University of Tokyo",
  "country": "Japan",
  "deadline": "2025-05-31",
  "requirements": ["High school diploma", "Japanese language proficiency", "Academic excellence", "Health certificate"],
  "type": "Government-funded",
  "coverage": "Full tuition + living allowance + travel",
  "duration": "4 years",
  "applicationProcess": "Embassy recommendation or university recommendation",
  "eligibility": "Non-Japanese citizens, under 25 years old",
  "benefits": ["Full funding", "Japanese language training", "Cultural activities"],
  "image": "/uni of tokyo.jpeg",
  "donor": "Japanese Government (MEXT)",
  "contactEmail": "admissions@u-tokyo.ac.jp",
  "website": "https://www.u-tokyo.ac.jp/en/scholarships"
}
```

### 5. Kyoto University - International Undergraduate Scholarship
```json
{
  "title": "Kyoto University International Undergraduate Scholarship",
  "description": "Merit-based scholarship for international students at Kyoto University",
  "amount": "50-100% tuition",
  "university": "Kyoto University",
  "country": "Japan",
  "deadline": "2025-04-15",
  "requirements": ["Academic excellence", "English/Japanese proficiency", "Research interest", "Personal statement"],
  "type": "Merit-based",
  "coverage": "50-100% tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Research opportunities", "Cultural exchange"],
  "image": "/kyoto uni.jpeg",
  "donor": "Kyoto University",
  "contactEmail": "international@kyoto-u.ac.jp",
  "website": "https://www.kyoto-u.ac.jp/en/scholarships"
}
```

## South Korea Universities

### 6. Seoul National University - Global Korea Scholarship
```json
{
  "title": "Global Korea Scholarship - Seoul National University",
  "description": "Korean government scholarship for international undergraduate students",
  "amount": "Full funding",
  "university": "Seoul National University",
  "country": "South Korea",
  "deadline": "2025-03-31",
  "requirements": ["High school diploma", "Korean/English proficiency", "Academic excellence", "Health certificate"],
  "type": "Government-funded",
  "coverage": "Full tuition + living allowance + airfare",
  "duration": "4 years",
  "applicationProcess": "Embassy recommendation or university recommendation",
  "eligibility": "Non-Korean citizens, under 25 years old",
  "benefits": ["Full funding", "Korean language training", "Cultural activities"],
  "image": "/Seoul National University (SNU).jpeg",
  "donor": "Korean Government (NIIED)",
  "contactEmail": "admissions@snu.ac.kr",
  "website": "https://en.snu.ac.kr/scholarships"
}
```

### 7. KAIST - International Student Scholarship
```json
{
  "title": "KAIST International Student Scholarship",
  "description": "Merit-based scholarship for international students in science and technology",
  "amount": "Full tuition + living allowance",
  "university": "KAIST",
  "country": "South Korea",
  "deadline": "2025-04-30",
  "requirements": ["Academic excellence", "Science/Engineering interest", "English proficiency", "Research potential"],
  "type": "Merit-based",
  "coverage": "Full tuition + living allowance",
  "duration": "4 years",
  "applicationProcess": "Online application with interview",
  "eligibility": "International undergraduate students in STEM fields",
  "benefits": ["Full funding", "Research opportunities", "Industry connections"],
  "image": "/KAIST.jpeg",
  "donor": "KAIST",
  "contactEmail": "admissions@kaist.ac.kr",
  "website": "https://www.kaist.ac.kr/en/scholarships"
}
```

## Taiwan Universities

### 8. National Taiwan University - Taiwan Scholarship
```json
{
  "title": "Taiwan Scholarship - National Taiwan University",
  "description": "Taiwan government scholarship for international undergraduate students",
  "amount": "Full funding",
  "university": "National Taiwan University",
  "country": "Taiwan",
  "deadline": "2025-03-31",
  "requirements": ["High school diploma", "English/Chinese proficiency", "Academic excellence", "Health certificate"],
  "type": "Government-funded",
  "coverage": "Full tuition + living allowance",
  "duration": "4 years",
  "applicationProcess": "Embassy recommendation",
  "eligibility": "Non-Taiwanese citizens, under 25 years old",
  "benefits": ["Full funding", "Language training", "Cultural activities"],
  "image": "/National Taiwan University.jpeg",
  "donor": "Taiwan Government (MOE)",
  "contactEmail": "admissions@ntu.edu.tw",
  "website": "https://www.ntu.edu.tw/english/scholarships"
}
```

## Turkey Universities

### 9. Bogazici University - International Student Scholarship
```json
{
  "title": "Bogazici International Student Scholarship",
  "description": "Merit-based scholarship for international undergraduate students",
  "amount": "50-100% tuition",
  "university": "Bogazici University",
  "country": "Turkey",
  "deadline": "2025-04-15",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Community service"],
  "type": "Merit-based",
  "coverage": "50-100% tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Cultural integration", "Research opportunities"],
  "image": "/Bogazici University.jpeg",
  "donor": "Bogazici University",
  "contactEmail": "international@boun.edu.tr",
  "website": "https://www.boun.edu.tr/en/scholarships"
}
```

## Ireland Universities

### 10. Trinity College Dublin - International Excellence Scholarship
```json
{
  "title": "Trinity International Excellence Scholarship",
  "description": "Merit-based scholarship for outstanding international undergraduate students",
  "amount": "€5,000-15,000",
  "university": "Trinity College Dublin",
  "country": "Ireland",
  "deadline": "2025-02-01",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Personal statement"],
  "type": "Merit-based",
  "coverage": "Partial to full tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Cultural activities", "Mentorship program"],
  "image": "/Trinity College Dublin.jpeg",
  "donor": "Trinity College Dublin",
  "contactEmail": "international@tcd.ie",
  "website": "https://www.tcd.ie/scholarships"
}
```

### 11. University College Dublin - Global Excellence Scholarship
```json
{
  "title": "UCD Global Excellence Scholarship",
  "description": "Merit-based scholarship for international students at UCD",
  "amount": "€10,000-20,000",
  "university": "University College Dublin",
  "country": "Ireland",
  "deadline": "2025-02-01",
  "requirements": ["Academic excellence", "English proficiency", "Leadership experience", "Community involvement"],
  "type": "Merit-based",
  "coverage": "Partial to full tuition",
  "duration": "4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Cultural integration", "Research opportunities"],
  "image": "/University College Dublin.jpeg",
  "donor": "University College Dublin",
  "contactEmail": "international@ucd.ie",
  "website": "https://www.ucd.ie/scholarships"
}
```

## Canada Universities

### 12. University of Toronto - Lester B. Pearson International Scholarship
```json
{
  "title": "Lester B. Pearson International Scholarship",
  "description": "Full scholarship for exceptional international undergraduate students",
  "amount": "Full funding",
  "university": "University of Toronto",
  "country": "Canada",
  "deadline": "2025-11-30",
  "requirements": ["Academic excellence", "Leadership potential", "Community involvement", "Innovation mindset"],
  "type": "Merit-based",
  "coverage": "Full tuition + living expenses + books",
  "duration": "4 years",
  "applicationProcess": "Nominated by high school, online application",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Full funding", "Research opportunities", "Alumni network"],
  "image": "/university-of-toronto-campus.png",
  "donor": "University of Toronto",
  "contactEmail": "international.admissions@utoronto.ca",
  "website": "https://future.utoronto.ca/pearson"
}
```

## Australia Universities

### 13. University of Melbourne - International Undergraduate Scholarship
```json
{
  "title": "Melbourne International Undergraduate Scholarship",
  "description": "Merit-based scholarship for international undergraduate students",
  "amount": "A$10,000-50,000",
  "university": "University of Melbourne",
  "country": "Australia",
  "deadline": "2025-04-30",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Personal statement"],
  "type": "Merit-based",
  "coverage": "Partial to full tuition",
  "duration": "3-4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Cultural activities", "Mentorship program"],
  "image": "/australian-university-campus.png",
  "donor": "University of Melbourne",
  "contactEmail": "international@unimelb.edu.au",
  "website": "https://www.unimelb.edu.au/scholarships"
}
```

## Germany Universities

### 14. Technical University of Munich - International Student Scholarship
```json
{
  "title": "TUM International Student Scholarship",
  "description": "Merit-based scholarship for international undergraduate students",
  "amount": "€500-1,500/month",
  "university": "Technical University of Munich",
  "country": "Germany",
  "deadline": "2025-05-31",
  "requirements": ["Academic excellence", "German/English proficiency", "Financial need", "Personal statement"],
  "type": "Need-based",
  "coverage": "Living allowance",
  "duration": "3-4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate students",
  "benefits": ["Living allowance", "Cultural integration", "Research opportunities"],
  "image": "/german-university-campus.png",
  "donor": "TUM",
  "contactEmail": "international@tum.de",
  "website": "https://www.tum.de/en/scholarships"
}
```

## Netherlands Universities

### 15. University of Amsterdam - Amsterdam Excellence Scholarship
```json
{
  "title": "Amsterdam Excellence Scholarship",
  "description": "Merit-based scholarship for outstanding international students",
  "amount": "€25,000",
  "university": "University of Amsterdam",
  "country": "Netherlands",
  "deadline": "2025-01-15",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Research interest"],
  "type": "Merit-based",
  "coverage": "Full tuition + living allowance",
  "duration": "3 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "Non-EU international undergraduate applicants",
  "benefits": ["Full funding", "Research opportunities", "Cultural activities"],
  "image": "/netherlands-university-campus.jpg",
  "donor": "University of Amsterdam",
  "contactEmail": "international@uva.nl",
  "website": "https://www.uva.nl/scholarships"
}
```

## United Kingdom Universities

### 16. University of Cambridge - Cambridge International Scholarship
```json
{
  "title": "Cambridge International Scholarship",
  "description": "Merit-based scholarship for international undergraduate students",
  "amount": "£10,000-20,000",
  "university": "University of Cambridge",
  "country": "United Kingdom",
  "deadline": "2025-01-15",
  "requirements": ["Academic excellence", "English proficiency", "Leadership potential", "Personal statement"],
  "type": "Merit-based",
  "coverage": "Partial to full tuition",
  "duration": "3-4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants",
  "benefits": ["Tuition coverage", "Research opportunities", "Cultural activities"],
  "image": "/cambridge-university-campus.jpg",
  "donor": "University of Cambridge",
  "contactEmail": "admissions@cam.ac.uk",
  "website": "https://www.cam.ac.uk/scholarships"
}
```

### 17. Imperial College London - International Excellence Scholarship
```json
{
  "title": "Imperial International Excellence Scholarship",
  "description": "Merit-based scholarship for international students in STEM fields",
  "amount": "£5,000-15,000",
  "university": "Imperial College London",
  "country": "United Kingdom",
  "deadline": "2025-01-15",
  "requirements": ["Academic excellence", "STEM field", "English proficiency", "Research potential"],
  "type": "Merit-based",
  "coverage": "Partial tuition",
  "duration": "3-4 years",
  "applicationProcess": "Online application with supporting documents",
  "eligibility": "International undergraduate applicants in STEM",
  "benefits": ["Tuition coverage", "Research opportunities", "Industry connections"],
  "image": "/Imperial College London.jpeg",
  "donor": "Imperial College London",
  "contactEmail": "international@imperial.ac.uk",
  "website": "https://www.imperial.ac.uk/scholarships"
}
```

## United States Universities

### 18. MIT - International Student Scholarship
```json
{
  "title": "MIT International Student Scholarship",
  "description": "Need-based scholarship for international undergraduate students",
  "amount": "Variable based on need",
  "university": "Massachusetts Institute of Technology",
  "country": "United States",
  "deadline": "2025-01-01",
  "requirements": ["Financial need", "Academic excellence", "English proficiency", "Personal statement"],
  "type": "Need-based",
  "coverage": "Variable based on need",
  "duration": "4 years",
  "applicationProcess": "Financial aid application with supporting documents",
  "eligibility": "International undergraduate applicants with financial need",
  "benefits": ["Financial support", "Research opportunities", "Cultural activities"],
  "image": "/mit-campus-aerial.png",
  "donor": "MIT",
  "contactEmail": "finaid@mit.edu",
  "website": "https://web.mit.edu/finaid/scholarships"
}
```

### 19. Harvard University - International Student Aid
```json
{
  "title": "Harvard International Student Aid",
  "description": "Need-based financial aid for international undergraduate students",
  "amount": "Variable based on need",
  "university": "Harvard University",
  "country": "United States",
  "deadline": "2025-01-01",
  "requirements": ["Financial need", "Academic excellence", "English proficiency", "Personal statement"],
  "type": "Need-based",
  "coverage": "Variable based on need",
  "duration": "4 years",
  "applicationProcess": "Financial aid application with supporting documents",
  "eligibility": "International undergraduate applicants with financial need",
  "benefits": ["Financial support", "Research opportunities", "Alumni network"],
  "image": "/harvard-campus.jpg",
  "donor": "Harvard University",
  "contactEmail": "finaid@harvard.edu",
  "website": "https://college.harvard.edu/financial-aid"
}
```

### 20. Stanford University - International Student Aid
```json
{
  "title": "Stanford International Student Aid",
  "description": "Need-based financial aid for international undergraduate students",
  "amount": "Variable based on need",
  "university": "Stanford University",
  "country": "United States",
  "deadline": "2025-01-01",
  "requirements": ["Financial need", "Academic excellence", "English proficiency", "Personal statement"],
  "type": "Need-based",
  "coverage": "Variable based on need",
  "duration": "4 years",
  "applicationProcess": "Financial aid application with supporting documents",
  "eligibility": "International undergraduate applicants with financial need",
  "benefits": ["Financial support", "Research opportunities", "Cultural activities"],
  "image": "/stanford-campus.jpg",
  "donor": "Stanford University",
  "contactEmail": "finaid@stanford.edu",
  "website": "https://financialaid.stanford.edu"
}
```

---

## Summary
- **Total Scholarships**: 20
- **Countries Covered**: 10 (China, Japan, South Korea, Taiwan, Turkey, Ireland, Canada, Australia, Germany, Netherlands, UK, USA)
- **Types**: Government-funded, Merit-based, Need-based
- **Coverage**: Full funding to partial tuition coverage
- **Duration**: 3-4 years (typical undergraduate program length)

## Usage Instructions
1. Copy each JSON object
2. POST to `/api/scholarships` endpoint
3. Include `Content-Type: application/json` header
4. All scholarships are for international bachelor students