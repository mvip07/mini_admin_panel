// toasts.js
export default function toasts(status, bodyText) {
    const toastContainer = document.querySelector("#toastContainer");
    const toast = document.createElement("div");
    const toastIcon = status === "success"
        ? '<i class="fa-regular fa-circle-check fs-3 me-2"></i>'
        : '<i class="fa-solid fa-circle-exclamation fs-3 me-2"></i>';
    const toastClass = status === "success" ? "bg-success" : "bg-danger";

    toast.innerHTML = `
        <div class="toast ${toastClass} text-white fs-6" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body d-flex align-items-center">
                ${toastIcon}
                <p class="mb-0">${bodyText}</p>
            </div>
        </div>
    `;

    toastContainer.appendChild(toast);

    const toastElement = toast.querySelector('.toast');
    const toastInstance = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toastInstance.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}
