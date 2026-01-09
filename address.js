// Contact Manager Class
console.log("File JS berhasil terhubung!");
class ContactManager {
    constructor() {
        this.contacts = [];
        this.nextId = 1;
        this.currentEditingId = null;
        
        // Initialize with sample data
        this.initializeSampleContacts();
    }
    
    initializeSampleContacts() {
        const sampleContacts = [
            { id: 1, name: "Muhammad Tara Mahardika", email: "TaraMhardika@example.com", phone: "0819-5379-8305" },
            { id: 2, name: "Alexander Dionis H.T", email: "AlexHytam@example.com", phone: "0895-3145-4726" },
            { id: 3, name: "Syahlana Izhar Halqi", email: "halqysh@example.com", phone: "0813-8816-2317" }
        ];
        
        this.contacts = sampleContacts;
        this.nextId = 4;
    }
    
    // Get all contacts
    getAllContacts() {
        return this.contacts;
    }
    
    // Add new contact
    addContact(contactData) {
        const newContact = {
            id: this.nextId++,
            name: contactData.name,
            email: contactData.email || '',
            phone: contactData.phone || ''
        };
        
        this.contacts.push(newContact);
        return newContact;
    }
    
    // Update contact
    updateContact(id, updatedData) {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            this.contacts[index] = {
                ...this.contacts[index],
                name: updatedData.name,
                email: updatedData.email || '',
                phone: updatedData.phone || ''
            };
            return this.contacts[index];
        }
        return null;
    }
    
    // Delete contact
    deleteContact(id) {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            return this.contacts.splice(index, 1)[0];
        }
        return null;
    }
    
    // Get contact by ID
    getContactById(id) {
        return this.contacts.find(c => c.id === id);
    }
}

// DOM Elements
const contactManager = new ContactManager();

// Main Sections
const contactListSection = document.getElementById('contactListSection');
const addContactForm = document.getElementById('addContactForm');
const editContactForm = document.getElementById('editContactForm');

// Buttons
const addContactBtn = document.getElementById('addContactBtn');
const showListBtn = document.getElementById('showListBtn');
const exitBtn = document.getElementById('exitBtn');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// Forms
const addContactFormContent = document.getElementById('addContactFormContent');
const editContactFormContent = document.getElementById('editContactFormContent');

// Contact List
const contactList = document.getElementById('contactList');
const emptyState = document.getElementById('emptyState');
const contactAlert = document.getElementById('contactAlert');

// Delete Modal
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.querySelector('.close-modal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const deleteContactName = document.getElementById('deleteContactName');

// Current contact to delete
let currentDeleteId = null;

// Show alert message
function showAlert(message, type = 'info') {
    contactAlert.textContent = message;
    contactAlert.className = `alert alert-${type}`;
    contactAlert.style.display = 'block';
    
    setTimeout(() => {
        contactAlert.style.display = 'none';
    }, 3000);
}

// Render contact list
function renderContactList() {
    contactList.innerHTML = '';
    
    if (contactManager.getAllContacts().length === 0) {
        emptyState.style.display = 'block';
        contactListSection.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    contactManager.getAllContacts().forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact-item';
        
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';
        
        const name = document.createElement('div');
        name.className = 'contact-name';
        name.textContent = contact.name;
        
        const email = document.createElement('div');
        email.className = 'contact-email';
        email.textContent = contact.email || 'Email tidak tersedia';
        
        const phone = document.createElement('div');
        phone.className = 'contact-phone';
        phone.textContent = contact.phone || 'Nomor telepon tidak tersedia';
        
        contactInfo.appendChild(name);
        contactInfo.appendChild(email);
        contactInfo.appendChild(phone);
        
        const actions = document.createElement('div');
        actions.className = 'contact-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => showEditForm(contact.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.textContent = 'Hapus';
        deleteBtn.addEventListener('click', () => showDeleteConfirmation(contact.id));
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(contactInfo);
        li.appendChild(actions);
        
        contactList.appendChild(li);
    });
}

// Show add contact form
function showAddForm() {
    contactListSection.classList.remove('active');
    editContactForm.classList.remove('active');
    addContactForm.classList.add('active');
    document.getElementById('name').focus();
}

// Show edit contact form
function showEditForm(contactId) {
    const contact = contactManager.getContactById(contactId);
    if (!contact) {
        showAlert('Kontak tidak ditemukan!', 'danger');
        return;
    }
    
    document.getElementById('editId').value = contact.id;
    document.getElementById('editName').value = contact.name;
    document.getElementById('editEmail').value = contact.email || '';
    document.getElementById('editPhone').value = contact.phone || '';
    
    contactListSection.classList.remove('active');
    addContactForm.classList.remove('active');
    editContactForm.classList.add('active');
    document.getElementById('editName').focus();
}

// Show delete confirmation modal
function showDeleteConfirmation(contactId) {
    const contact = contactManager.getContactById(contactId);
    if (!contact) {
        showAlert('Kontak tidak ditemukan!', 'danger');
        return;
    }
    
    currentDeleteId = contactId;
    deleteContactName.textContent = contact.name;
    deleteModal.style.display = 'flex';
}

// Hide delete modal
function hideDeleteModal() {
    deleteModal.style.display = 'none';
    currentDeleteId = null;
}

// Show contact list
function showContactList() {
    contactListSection.classList.add('active');
    addContactForm.classList.remove('active');
    editContactForm.classList.remove('active');
    renderContactList();
}

// Event Listeners
addContactBtn.addEventListener('click', showAddForm);
showListBtn.addEventListener('click', showContactList);
exitBtn.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin keluar? Semua perubahan akan disimpan.')) {
        showAlert('Terima kasih telah menggunakan aplikasi ini!', 'success');
        // In a real app, you might save to localStorage or server here
    }
});

cancelAddBtn.addEventListener('click', showContactList);
cancelEditBtn.addEventListener('click', showContactList);

// Close delete modal
closeDeleteModal.addEventListener('click', hideDeleteModal);
cancelDeleteBtn.addEventListener('click', hideDeleteModal);

// Confirm delete
confirmDeleteBtn.addEventListener('click', () => {
    if (currentDeleteId) {
        const deletedContact = contactManager.deleteContact(currentDeleteId);
        if (deletedContact) {
            showAlert(`Kontak "${deletedContact.name}" berhasil dihapus!`, 'success');
            hideDeleteModal();
            renderContactList();
        } else {
            showAlert('Gagal menghapus kontak!', 'danger');
            hideDeleteModal();
        }
    }
});

// Add contact form submission
addContactFormContent.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!name) {
        showAlert('Nama wajib diisi!', 'danger');
        return;
    }
    
    const newContact = contactManager.addContact({
        name,
        email,
        phone
    });
    
    showAlert(`Kontak "${newContact.name}" berhasil ditambahkan!`, 'success');
    addContactFormContent.reset();
    showContactList();
});

// Edit contact form submission
editContactFormContent.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editId').value);
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    
    if (!name) {
        showAlert('Nama wajib diisi!', 'danger');
        return;
    }
    
    const updatedContact = contactManager.updateContact(id, {
        name,
        email,
        phone
    });
    
    if (updatedContact) {
        showAlert(`Kontak "${updatedContact.name}" berhasil diperbarui!`, 'success');
        showContactList();
    } else {
        showAlert('Gagal memperbarui kontak!', 'danger');
    }
});

// Initial render
renderContactList();

// Handle escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideDeleteModal();
    }
});

// Click outside modal to close
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        hideDeleteModal();
    }
});
