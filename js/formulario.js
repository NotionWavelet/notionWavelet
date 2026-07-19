(function () {
  "use strict";

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var form = document.getElementById("trial-form");
    if (!form) return;

    var submitButton = document.getElementById("trial-submit");
    var submitLabel = submitButton.querySelector(".nw-submit-label");
    var status = document.getElementById("trial-form-status");

    var fields = [
      {
        input: document.getElementById("trial-name"),
        message: "Introduce tu nombre y apellidos."
      },
      {
        input: document.getElementById("trial-workshop"),
        message: "Introduce el nombre de tu taller."
      },
      {
        input: document.getElementById("trial-email"),
        message: "Introduce un correo electrónico válido."
      },
      {
        input: document.getElementById("trial-phone"),
        message: "Revisa el número de teléfono."
      }
    ];

    var consent = document.getElementById("trial-consent");
    var consentError = document.getElementById("trial-consent-error");

    var requestTypeInputs = Array.prototype.slice.call(form.querySelectorAll('input[name="tipo_solicitud"]'));
    var billingFields = document.getElementById("billing-fields");
    var billingRequired = [
      document.getElementById("billing-business-name"),
      document.getElementById("billing-tax-id"),
      document.getElementById("billing-address"),
      document.getElementById("billing-postal"),
      document.getElementById("billing-city")
    ].filter(Boolean);

    function updateRequestType() {
      var selected = form.querySelector('input[name="tipo_solicitud"]:checked');
      var contracting = selected && selected.value === "Quiero contratar";
      if (billingFields) billingFields.hidden = !contracting;
      billingRequired.forEach(function (input) { input.required = Boolean(contracting); });
      requestTypeInputs.forEach(function (input) {
        input.closest("label").classList.toggle("is-selected", input.checked);
      });
      submitLabel.textContent = contracting ? "Solicitar alta" : "Solicitar prueba";
    }

    requestTypeInputs.forEach(function (input) { input.addEventListener("change", updateRequestType); });
    updateRequestType();

    function setFieldError(field, message) {
      var wrapper = field.input.closest(".nw-form-field");
      var error = document.getElementById(field.input.getAttribute("aria-describedby"));

      wrapper.classList.toggle("has-error", Boolean(message));
      field.input.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message || "";
    }

    function validateField(field) {
      var input = field.input;
      var value = input.value.trim();

      if (input.required && !value) {
        setFieldError(field, field.message);
        return false;
      }

      if (value && input.type === "email") {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailPattern.test(value)) {
          setFieldError(field, field.message);
          return false;
        }
      }

      if (value && input.type === "tel") {
        var normalizedPhone = value.replace(/[^\d+]/g, "");
        if (normalizedPhone.length < 7) {
          setFieldError(field, field.message);
          return false;
        }
      }

      if (value && input.minLength > 0 && value.length < input.minLength) {
        setFieldError(field, field.message);
        return false;
      }

      setFieldError(field, "");
      return true;
    }

    function validateConsent() {
      var valid = consent.checked;
      consent.closest(".nw-consent").classList.toggle("has-error", !valid);
      consent.setAttribute("aria-invalid", valid ? "false" : "true");
      consentError.textContent = valid
        ? ""
        : "Debes aceptar el tratamiento de datos para enviar la solicitud.";
      return valid;
    }

    function showStatus(type, message) {
      status.className = "nw-form-status is-visible is-" + type;
      status.textContent = message;
    }

    function clearStatus() {
      status.className = "nw-form-status";
      status.textContent = "";
    }

    function setSubmitting(submitting) {
      form.classList.toggle("is-submitting", submitting);
      submitButton.disabled = submitting;
      submitButton.setAttribute("aria-busy", submitting ? "true" : "false");
      submitLabel.textContent = submitting ? "Enviando solicitud…" : ((form.querySelector('input[name="tipo_solicitud"]:checked') || {}).value === "Quiero contratar" ? "Solicitar alta" : "Solicitar prueba");
    }

    fields.forEach(function (field) {
      field.input.addEventListener("blur", function () {
        validateField(field);
      });

      field.input.addEventListener("input", function () {
        if (field.input.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
        clearStatus();
      });
    });

    consent.addEventListener("change", function () {
      validateConsent();
      clearStatus();
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearStatus();

      var valid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });
      if (!validateConsent()) valid = false;

      if (valid && !form.checkValidity()) {
        valid = false;
      }

      if (!valid) {
        showStatus("error", "Revisa los campos indicados antes de continuar.");
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var honeypot = document.getElementById("trial-company-web");
      if (honeypot && honeypot.value) return;

      setSubmitting(true);

      try {
        var response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("No se pudo enviar la solicitud.");
        }

        window.location.href = "gracias.html";
      } catch (error) {
        showStatus(
          "error",
          "No hemos podido enviar la solicitud. Comprueba tu conexión o inténtalo de nuevo dentro de unos minutos."
        );
        setSubmitting(false);
      }
    });
  });
})();
