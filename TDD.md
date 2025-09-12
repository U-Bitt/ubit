# TDD

### 1. Background

High school seniors in Mongolia face difficulties finding accurate, consolidated information about universities abroad. Currently, they rely on paid agencies or scattered research.

Our website provides a **centralized, up-to-date, bilingual platform** with details about universities, entrance exams, scholarships, visa requirements, and training programs.

---

### 2. Non-Goals

- No admin panel at launch (data is added via backend interface or seed scripts).
- No real-time chat or community forum initially.
- No payment gateway or booking system in v1.

---

### 3. Terminology

- **University**: An institution abroad offering programs for Mongolian students.
- **Exam**: Standardized tests (IELTS, SAT, TOPIK, etc.).
- **Package**: Bundled training courses.
- **Training**: Prep courses for exams.
- **Visa Docs**: Required documents and guides.
- **User Profile**: Student’s personal information, scores, and saved schools.

---

### 4. Tech Stack

**Frontend:**

- Next.js (React + TypeScript)
- Tailwind CSS
- ESLint, PostCSS
- Hooks for state management (localStorage hook included)

**Backend:**

- Node.js + Express (or Nest.js)
- MongoDB (Atlas) for data storage
- REST API endpoints (JSON responses)

**Other:**

- GitHub for version control
- Deployment: Vercel

---

### 5. Functional Requirements

**User:**

- View universities, exams, training, visa info, packages, recommendations.
- View detailed university info (fees, dorms, scholarships, majors).
- Save universities/exams to profile.
- View visa requirements and guides (EN/MN).
- Log in / Sign up (static authentication for v1).
- Recommendations page suggests universities based on exam scores.

---

### 6. Nonfunctional Requirements

- **Authentication:** Login & signup (no real database at first; seed/test accounts for demo).
- **Performance:** API response time < 300ms for common requests.
- **Scalability:** Modular backend ready for real DB integration.
- **Maintainability:** Code split into modules/components.
- **Internationalization:** EN and MN content supported (i18n).
- **Clean UI:** Minimal, responsive design with accessible color palette.

---

### 7. User Flow

1. **Landing page** → shows featured countries/universities.
2. **User browses** → selects category (Universities / Exams / Training / Visa).
3. **User clicks item** → goes to detail page (UniversityDetail).
4. **User signs up / logs in** → to save items or track exam scores.
5. **User views Profile** → Exam scores, Prepared list, Visa materials, Volunteer activities.

---

### 8. API Definitions

All responses in JSON.

| Endpoint | Method | Auth | Description |
| --- | --- | --- | --- |
| `/api/auth/signup` | POST | Public | Create user (demo: static accounts). |
| `/api/auth/login` | POST | Public | Login (demo: static accounts). |
| `/api/universities` | GET | Public | List all universities. |
| `/api/universities/:id` | GET | Public | Get university details. |
| `/api/exams` | GET | Public | List all exams. |
| `/api/exams/:id` | GET | Public | Exam details. |
| `/api/trainings` | GET | Public | List training programs. |
| `/api/trainings/:id` | GET | Public | Training details. |
| `/api/visa` | GET | Public | Visa docs and guides. |
| `/api/user/profile` | GET | Private (JWT) | Fetch user profile, exam scores, saved items. |
| `/api/user/profile` | PUT | Private (JWT) | Update user profile, exam scores. |
| `/api/user/saved` | POST | Private (JWT) | Save universities/exams. |

---

### 9. Frontend Mapping to Backend

- `src/pages/universities.tsx` → `/api/universities`
- `src/pages/universityDetail.tsx` → `/api/universities/:id`
- `src/pages/exams.tsx` → `/api/exams`
- `src/pages/trainings.tsx` → `/api/trainings`
- `src/pages/visa.tsx` → `/api/visa`
- `src/pages/user-profile/*` → `/api/user/profile`

---

### 10. Data Model (MongoDB Draft)

**User**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "examScores": [{ "examId": "ObjectId", "score": "number" }],
  "savedUniversities": ["ObjectId"]
}

```

**University**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "country": "string",
  "majors": ["string"],
  "fees": { "tuition": "number", "currency": "USD" },
  "scholarships": ["string"],
  "dormInfo": "string",
  "visaRequirements": "string"
}

```

…and similarly for `Exams`, `Trainings`, `VisaDocs`.