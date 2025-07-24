const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function migrateStudents() {
  const snapshot = await db.collection('students').get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updated = {
      firstName: data.firstName || data.FirstName || "",
      lastName: data.lastName || data.LastName || "",
      email: data.email || data.Email || "",
      phone: data.phone || data.Phone || "",
      school: data.school || data.Institution || "",
      schoolLocation: data.schoolLocation || data.Location || "",
      studentId: data.studentId || data.StudentId || "",
      program: data.program || data.Program || "",
      expectedGraduation: data.expectedGraduation || data.ExpectedGraduation || "",
      emergencyContactName: data.emergencyContactName || (data.EmergencyContact && data.EmergencyContact.name) || "",
      emergencyContactPhone: data.emergencyContactPhone || (data.EmergencyContact && data.EmergencyContact.phone) || "",
      photoURL: data.photoURL || data.PhotoURL || "",
      immunizationURL: data.immunizationURL || "",
      cprURL: data.cprURL || "",
      status: data.status || data.Status || "",
      adminNotes: data.adminNotes || data.AdminNotes || "",
      dob: data.dob || data.DOB || "",
      address: data.address || data.Address || "",
      enrollmentDate: data.enrollmentDate || data.EnrollmentDate || "",
      education: data.education || data.Education || [],
      clinicalRotations: data.clinicalRotations || data.ClinicalRotations || [],
      documents: data.documents || data.Documents || [],
      communication: data.communication || data.Communication || [],
      rotationApplications: data.rotationApplications || data.RotationApplications || [],
      evaluations: data.evaluations || data.Evaluations || [],
      clinicalHours: data.clinicalHours || data.ClinicalHours || [],
      attendance: data.attendance || data.Attendance || [],
      licensing: data.licensing || data.Licensing || [],
      financials: data.financials || data.Financials || [],
      feedback: data.feedback || data.Feedback || [],
      advisors: data.advisors || data.Advisors || [],
      alerts: data.alerts || data.Alerts || [],
      compliance: data.compliance || data.Compliance || []
    };
    await doc.ref.set(updated, { merge: true });
    console.log(`Migrated student: ${doc.id}`);
  }
  console.log('Migration complete!');
}
migrateStudents();