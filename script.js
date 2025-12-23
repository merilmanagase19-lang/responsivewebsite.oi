   const defaultConfig = {
      form_title: "Create Your Account",
      form_subtitle: "Fill in your details to get started",
      submit_button_text: "Register Now",
      success_message: "Your registration has been submitted successfully!"
    };

    let formData = {};
    let confirmationModal;

    async function onConfigChange(config) {
      document.getElementById('formTitle').textContent = config.form_title || defaultConfig.form_title;
      document.getElementById('formSubtitle').textContent = config.form_subtitle || defaultConfig.form_subtitle;
      document.getElementById('submitBtn').textContent = config.submit_button_text || defaultConfig.submit_button_text;
      document.getElementById('successMessage').textContent = config.success_message || defaultConfig.success_message;
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["form_title", config.form_title || defaultConfig.form_title],
        ["form_subtitle", config.form_subtitle || defaultConfig.form_subtitle],
        ["submit_button_text", config.submit_button_text || defaultConfig.submit_button_text],
        ["success_message", config.success_message || defaultConfig.success_message]
      ]);
    }

    document.addEventListener('DOMContentLoaded', async function() {
      if (window.elementSdk) {
        await window.elementSdk.init({
          defaultConfig,
          onConfigChange,
          mapToCapabilities,
          mapToEditPanelValues
        });
      }

      confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
      
      const form = document.getElementById('registrationForm');
      const togglePassword = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password');
      const resetBtn = document.getElementById('resetBtn');
      const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
      const successAlert = document.getElementById('successAlert');

      // Password toggle
      togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
      });

      // Form submission
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }

        // Collect form data
        formData = {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          gender: document.getElementById('gender').value,
          contactNumber: document.getElementById('contactNumber').value,
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        };

        // Display confirmation modal
        const confirmationDetails = document.getElementById('confirmationDetails');
        confirmationDetails.innerHTML = `
          <div class="confirmation-item">
            <span class="confirmation-label">Full Name:</span>
            <span class="confirmation-value">${formData.fullName}</span>
          </div>
          <div class="confirmation-item">
            <span class="confirmation-label">Email:</span>
            <span class="confirmation-value">${formData.email}</span>
          </div>
          <div class="confirmation-item">
            <span class="confirmation-label">Gender:</span>
            <span class="confirmation-value">${formData.gender}</span>
          </div>
          <div class="confirmation-item">
            <span class="confirmation-label">Contact Number:</span>
            <span class="confirmation-value">${formData.contactNumber}</span>
          </div>
          <div class="confirmation-item">
            <span class="confirmation-label">Username:</span>
            <span class="confirmation-value">${formData.username}</span>
          </div>
          <div class="confirmation-item">
            <span class="confirmation-label">Password:</span>
            <span class="confirmation-value">${'•'.repeat(formData.password.length)}</span>
          </div>
        `;

        confirmationModal.show();
      });

      // Confirm submission
      confirmSubmitBtn.addEventListener('click', function() {
        confirmationModal.hide();
        
        // Show success message
        successAlert.classList.remove('d-none');
        
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        
        // Scroll to top to show success message
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successAlert.classList.add('d-none');
        }, 5000);
      });

      // Reset form
      resetBtn.addEventListener('click', function() {
        form.reset();
        form.classList.remove('was-validated');
        successAlert.classList.add('d-none');
      });
    });

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9b27e57b13528d0f',t:'MTc2NjQ5MzMwMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();