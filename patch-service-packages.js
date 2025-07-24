const admin = require('firebase-admin');

// Initialize Firebase Admin (use your existing service account key)
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  projectId: 'np-clinical-hub-prototype'
});

const db = admin.firestore();

async function patchServicePackages() {
  console.log('Starting to patch servicePackages collection...');
  
  try {
    // Get all documents from servicePackages collection
    const snapshot = await db.collection('servicePackages').get();
    
    if (snapshot.empty) {
      console.log('No documents found in servicePackages collection.');
      return;
    }

    console.log(`Found ${snapshot.size} documents to check.`);
    
    // Use batch for efficient updates
    const batch = db.batch();
    let updateCount = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      const updates = {};
      
      // Add missing fields with default values
      if (!('highlights' in data)) {
        updates.highlights = [];
      }
      
      if (!('faqs' in data)) {
        updates.faqs = [];
      }
      
      if (!('tags' in data)) {
        updates.tags = [];
      }
      
      if (!('testimonials' in data)) {
        updates.testimonials = [];
      }
      
      if (!('downloadableResources' in data)) {
        updates.downloadableResources = [];
      }
      
      if (!('lastUpdated' in data)) {
        updates.lastUpdated = new Date();
      }
      
      if (!('heroImage' in data)) {
        updates.heroImage = '';
      }
      
      if (!('providerProfile' in data)) {
        updates.providerProfile = {
          name: '',
          bio: '',
          image: ''
        };
      }

      // Only update if there are missing fields
      if (Object.keys(updates).length > 0) {
        batch.update(doc.ref, updates);
        updateCount++;
        console.log(`Queued update for document: ${doc.id}`);
        console.log(`  Adding fields: ${Object.keys(updates).join(', ')}`);
      }
    });

    if (updateCount > 0) {
      // Commit all updates
      await batch.commit();
      console.log(`✅ Successfully updated ${updateCount} documents.`);
    } else {
      console.log('✅ All documents already have the required fields.');
    }
    
  } catch (error) {
    console.error('❌ Error patching documents:', error);
  }
}

// Run the patch
patchServicePackages()
  .then(() => {
    console.log('Patch completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Patch failed:', error);
    process.exit(1);
  });