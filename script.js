// SPA ROUTER
function navigateTo(pageId) {
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.add('hidden');
  });

  const targetView = document.getElementById('view-' + pageId);
  if (targetView) {
    targetView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.remove('text-ayur-primary', 'border-ayur-primary');
    btn.classList.add('text-gray-600', 'border-transparent');
  });
  const activeBtn = document.getElementById('nav-' + pageId);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-600', 'border-transparent');
    activeBtn.classList.add('text-ayur-primary', 'border-ayur-primary');
  }
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  drawer.classList.toggle('hidden');
}

// DOSHA QUIZ CONTROLLER
let doshaScores = { vata: 0, pitta: 0, kapha: 0 };

function scrollToDoshaQuiz() {
  navigateTo('home');
  setTimeout(() => {
    document.getElementById('dosha-section').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function recordQuizAnswer(dosha, currentStep) {
  doshaScores[dosha]++;
  document.getElementById('q' + currentStep).classList.add('hidden');

  if (currentStep < 3) {
    document.getElementById('q' + (currentStep + 1)).classList.remove('hidden');
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById('quizResult').classList.remove('hidden');

  let maxDosha = 'vata';
  if (doshaScores.pitta > doshaScores[maxDosha]) maxDosha = 'pitta';
  if (doshaScores.kapha > doshaScores[maxDosha]) maxDosha = 'kapha';

  const nameEl = document.getElementById('doshaName');
  const descEl = document.getElementById('doshaDesc');
  const iconEl = document.getElementById('doshaIcon');
  const recEl = document.getElementById('doshaRecommendation');

  if (maxDosha === 'vata') {
    nameEl.innerText = 'Vata Constitution (Air & Space Principle)';
    descEl.innerText = 'You possess a quick, creative, and enthusiastic nature. When imbalanced, Vata triggers dryness, constipation, joint cracking, anxiety, and sleep irregularities.';
    iconEl.innerHTML = '<i class="fa-solid fa-wind"></i>';
    recEl.innerText = 'Recommended: Abhyanga with warm sesame oil, Shirodhara & cooked nourishing foods.';
  } else if (maxDosha === 'pitta') {
    nameEl.innerText = 'Pitta Constitution (Fire & Water Principle)';
    descEl.innerText = 'You possess sharp intellect, strong metabolism, and leadership qualities. When aggravated by stress or spicy foods, it causes acid reflux, skin eruptions, and inflammation.';
    iconEl.innerHTML = '<i class="fa-solid fa-fire"></i>';
    recEl.innerText = 'Recommended: Takradhara, Virechana liver detox & cooling herbs (Shatavari, Amla).';
  } else {
    nameEl.innerText = 'Kapha Constitution (Earth & Water Principle)';
    descEl.innerText = 'You have remarkable stamina, calmness, and strong immunity. When aggravated, it causes fluid retention, weight gain, sluggish metabolism, and respiratory congestion.';
    iconEl.innerHTML = '<i class="fa-solid fa-mountain"></i>';
    recEl.innerText = 'Recommended: Udwarthanam (dry herbal powder scrub), Vamana therapy & active exercise.';
  }
}

function resetDoshaQuiz() {
  doshaScores = { vata: 0, pitta: 0, kapha: 0 };
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('q2').classList.add('hidden');
  document.getElementById('q3').classList.add('hidden');
  document.getElementById('q1').classList.remove('hidden');
}

// PANCHAKARMA ESTIMATOR
const therapyRates = {
  shirodhara: { time: 45, price: 1500 },
  abhyanga: { time: 60, price: 1800 },
  katibasti: { time: 40, price: 1200 },
  nasya: { time: 30, price: 900 }
};

function calculateTherapyEstimate() {
  const checkboxes = document.querySelectorAll('.therapy-calc-check:checked');
  let totalTime = 0;
  let totalPrice = 0;

  checkboxes.forEach(cb => {
    const item = therapyRates[cb.value];
    if (item) {
      totalTime += item.time;
      totalPrice += item.price;
    }
  });

  document.getElementById('calcCount').innerText = `${checkboxes.length} procedure(s)`;
  document.getElementById('calcDuration').innerText = `${totalTime} minutes`;
  document.getElementById('calcPrice').innerText = `₹${totalPrice.toLocaleString('en-IN')}`;
}

function bookWithPreselectedTherapies() {
  openBookingModal();
  document.getElementById('selectedSpecialty').value = 'Panchakarma Detox Therapy';
  goToBookingStep(2);
}

// TREATMENTS FILTER
function filterTreatments(category) {
  document.querySelectorAll('.treatment-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('bg-ayur-primary', 'text-white');
      btn.classList.remove('bg-white', 'text-gray-700');
    } else {
      btn.classList.remove('bg-ayur-primary', 'text-white');
      btn.classList.add('bg-white', 'text-gray-700');
    }
  });

  const cards = document.querySelectorAll('.treatment-item');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// MULTI-STEP BOOKING MODAL
function openBookingModal() {
  document.getElementById('bookingModal').classList.remove('hidden');
  document.getElementById('bookingConfirmationSlip').classList.add('hidden');
  goToBookingStep(1);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('selectedDate').value = tomorrow.toISOString().split('T')[0];
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.add('hidden');
}

function goToBookingStep(step) {
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById('bookStep' + i);
    if (stepEl) stepEl.classList.add('hidden');

    const trackerEl = document.getElementById('stepTracker' + i);
    if (trackerEl) {
      if (i <= step) {
        trackerEl.classList.remove('text-gray-400');
        trackerEl.classList.add('text-ayur-primary', 'font-bold');
      } else {
        trackerEl.classList.remove('text-ayur-primary', 'font-bold');
        trackerEl.classList.add('text-gray-400');
      }
    }
  }
  document.getElementById('bookStep' + step).classList.remove('hidden');
}

function selectBookingSpecialty(specName) {
  document.getElementById('selectedSpecialty').value = specName;
  document.querySelectorAll('.spec-opt-btn').forEach(btn => {
    btn.classList.remove('border-ayur-primary', 'bg-ayur-light');
  });
  event.currentTarget.classList.add('border-ayur-primary', 'bg-ayur-light');
}

function selectTimeSlot(el, slot) {
  document.getElementById('selectedTimeSlot').value = slot;
  document.querySelectorAll('.slot-btn').forEach(btn => {
    btn.classList.remove('bg-ayur-primary', 'text-white');
  });
  el.classList.add('bg-ayur-primary', 'text-white');
}

function bookWithDoctor(doctorName) {
  openBookingModal();
  document.getElementById('selectedDoctor').value = doctorName;
  goToBookingStep(2);
}

let currentBookingData = {};

function generateConfirmationSlip() {
  const name = document.getElementById('patientName').value.trim();
  const phone = document.getElementById('patientPhone').value.trim();

  if (!name || !phone) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-red-600 text-white px-5 py-3 rounded-xl text-xs font-bold shadow-2xl z-[9999]';
    toast.innerText = 'Please provide patient full name and WhatsApp phone number.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
    return;
  }

  const specialty = document.getElementById('selectedSpecialty').value;
  const doctor = document.getElementById('selectedDoctor').value;
  const date = document.getElementById('selectedDate').value;
  const time = document.getElementById('selectedTimeSlot').value;
  const complaint = document.getElementById('patientComplaint').value || 'None';
  const mode = document.querySelector('input[name="consultMode"]:checked').value;
  const token = 'VDK-' + Math.floor(1000 + Math.random() * 9000);

  currentBookingData = { name, phone, specialty, doctor, date, time, complaint, mode, token };

  document.getElementById('slipToken').innerText = token;
  document.getElementById('slipDateTime').innerText = `${date} at ${time}`;
  document.getElementById('slipPatient').innerText = name;
  document.getElementById('slipDoctor').innerText = doctor;
  document.getElementById('slipSpecialty').innerText = specialty;
  document.getElementById('slipMode').innerText = mode;

  for (let i = 1; i <= 4; i++) {
    document.getElementById('bookStep' + i).classList.add('hidden');
  }
  document.getElementById('bookingConfirmationSlip').classList.remove('hidden');
}

function sendAppointmentToWhatsApp() {
  const { token, name, phone, doctor, specialty, date, time, mode, complaint } = currentBookingData;
  const hospitalWA = "919328465676";

  const message = `*NEW VAIDVIK CONSULTATION BOOKING (%23${token})*%0A` +
                  `*Patient Name:* ${encodeURIComponent(name)}%0A` +
                  `*Phone:* ${encodeURIComponent(phone)}%0A` +
                  `*Doctor:* ${encodeURIComponent(doctor)}%0A` +
                  `*Specialty:* ${encodeURIComponent(specialty)}%0A` +
                  `*Slot:* ${encodeURIComponent(date)} at ${encodeURIComponent(time)}%0A` +
                  `*Mode:* ${encodeURIComponent(mode)}%0A` +
                  `*Complaint:* ${encodeURIComponent(complaint)}`;

  window.open(`https://wa.me/${hospitalWA}?text=${message}`, '_blank');
}

// CONTACT INQUIRY DISPATCHER
function handleContactInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('inq_name').value;
  const phone = document.getElementById('inq_phone').value;
  const email = document.getElementById('inq_email').value || 'N/A';
  const mode = document.getElementById('inq_mode').value;
  const msg = document.getElementById('inq_message').value;

  const hospitalWA = "919328465676";
  const message = `*VAIDVIK AYURVEDA - OPD INQUIRY*%0A` +
                  `*Name:* ${encodeURIComponent(name)}%0A` +
                  `*Phone:* ${encodeURIComponent(phone)}%0A` +
                  `*Email:* ${encodeURIComponent(email)}%0A` +
                  `*Mode:* ${encodeURIComponent(mode)}%0A` +
                  `*Message:* ${encodeURIComponent(msg)}`;

  window.open(`https://wa.me/${hospitalWA}?text=${message}`, '_blank');
}

// SEARCH & MODALS
function openSearchModal() {
  document.getElementById('searchModal').classList.remove('hidden');
  document.getElementById('siteSearchInput').focus();
}
function closeSearchModal() {
  document.getElementById('searchModal').classList.add('hidden');
}

const searchableItems = [
  { title: 'Shirodhara Therapy', type: 'Treatment', page: 'treatments' },
  { title: 'Kati & Janu Basti (Spine Care)', type: 'Treatment', page: 'treatments' },
  { title: 'Virechana Purgation Detox', type: 'Treatment', page: 'treatments' },
  { title: 'PCOD & Thyroid Metabolic Protocol', type: 'Treatment', page: 'treatments' },
  { title: 'Psoriasis & Skin Protocol', type: 'Treatment', page: 'treatments' },
  { title: 'Dr. Vidhi Kadvani (Chief Ayurvedic Physician)', type: 'Doctor', page: 'doctors' },
  { title: 'Nadi Pariksha Pulse Diagnosis', type: 'Diagnostics', page: 'home' }
];

function performLiveSearch() {
  const q = document.getElementById('siteSearchInput').value.toLowerCase().trim();
  const box = document.getElementById('searchResultsBox');

  if (!q) {
    box.innerHTML = '<p class="text-gray-400 italic text-center py-4">Type any symptom, treatment, or doctor name above.</p>';
    return;
  }

  const matches = searchableItems.filter(item => item.title.toLowerCase().includes(q));
  if (matches.length === 0) {
    box.innerHTML = '<p class="text-gray-500 text-center py-4">No direct matches found. Try "Spine", "Panchakarma", or "Dr. Vidhi".</p>';
  } else {
    box.innerHTML = matches.map(m => `
      <div onclick="navigateTo('${m.page}'); closeSearchModal();" class="p-2.5 bg-ayur-light hover:bg-white rounded-xl cursor-pointer flex justify-between items-center transition-colors border border-ayur-border">
        <strong>${m.title}</strong>
        <span class="text-[10px] uppercase font-bold text-ayur-primary bg-white px-2 py-0.5 rounded border border-gray-200">${m.type}</span>
      </div>
    `).join('');
  }
}

function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').innerText = caption;
  document.getElementById('lightboxModal').classList.remove('hidden');
}
function closeLightbox() {
  document.getElementById('lightboxModal').classList.add('hidden');
}

function openTreatmentModal(title, subtitle, indications, duration, price) {
  document.getElementById('detailTitle').innerText = title;
  document.getElementById('detailSubtitle').innerText = subtitle;
  document.getElementById('detailIndications').innerText = indications;
  document.getElementById('detailDuration').innerText = duration;
  document.getElementById('detailPrice').innerText = price;
  document.getElementById('detailsModal').classList.remove('hidden');
}

function openBlogModal(title, content) {
  document.getElementById('detailBadge').innerText = 'Clinical Article';
  document.getElementById('detailTitle').innerText = title;
  document.getElementById('detailSubtitle').innerText = 'Vaidvik Health Wisdom';
  document.getElementById('detailIndications').innerText = content;
  document.getElementById('detailDuration').innerText = '5 Min Read';
  document.getElementById('detailPrice').innerText = 'Free Wellness Knowledge';
  document.getElementById('detailsModal').classList.remove('hidden');
}

function closeDetailsModal() {
  document.getElementById('detailsModal').classList.add('hidden');
}

function toggleWaChat() {
  const box = document.getElementById('waChatBox');
  box.classList.toggle('hidden');
}