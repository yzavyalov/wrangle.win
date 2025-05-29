<div>
    <div id="methods-wrapper">
        <!-- Один метод -->
        <div class="card mb-4 method" data-method-id="1">
            <div class="card-header d-flex justify-content-between align-items-center">
                <strong>Method: Bank Transfer</strong>
                <button class="btn btn-sm btn-danger remove-method">Delete Method</button>
            </div>
            <div class="card-body">
                <div class="payments-list">
                    <!-- Одна платежка -->
                    <div class="row mb-2 payment-item">
                        <div class="col">
                            <input type="text" name="methods[1][payments][]" class="form-control" placeholder="Enter payment info">
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-danger remove-payment">Remove</button>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-secondary add-payment mt-2">Add Payment</button>
            </div>
        </div>
    </div>

    <button type="button" class="btn btn-primary" id="add-method">Add Method</button>
</div>


<script>
    document.getElementById('add-method').addEventListener('click', function () {
        const methodId = Date.now(); // уникальный ID
        const wrapper = document.getElementById('methods-wrapper');

        const methodHtml = `
        <div class="card mb-4 method" data-method-id="${methodId}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <strong>Method: New Method</strong>
                <button class="btn btn-sm btn-danger remove-method">Delete Method</button>
            </div>
            <div class="card-body">
                <div class="payments-list">
                    <div class="row mb-2 payment-item">
                        <div class="col">
                            <input type="text" name="methods[${methodId}][payments][]" class="form-control" placeholder="Enter payment info">
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-danger remove-payment">Remove</button>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-secondary add-payment mt-2">Add Payment</button>
            </div>
        </div>
    `;

        wrapper.insertAdjacentHTML('beforeend', methodHtml);
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-payment')) {
            const card = e.target.closest('.card');
            const methodId = card.getAttribute('data-method-id');
            const paymentsList = card.querySelector('.payments-list');

            const paymentHtml = `
            <div class="row mb-2 payment-item">
                <div class="col">
                    <input type="text" name="methods[${methodId}][payments][]" class="form-control" placeholder="Enter payment info">
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-danger remove-payment">Remove</button>
                </div>
            </div>
        `;

            paymentsList.insertAdjacentHTML('beforeend', paymentHtml);
        }

        if (e.target.classList.contains('remove-payment')) {
            e.target.closest('.payment-item').remove();
        }

        if (e.target.classList.contains('remove-method')) {
            e.target.closest('.method').remove();
        }
    });
</script>
