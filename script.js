document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const fileInput = document.getElementById('foto');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const btnRemoveImage = document.getElementById('btnRemoveImage');

    // Manipulação do Preview da Imagem
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImg.src = event.target.result;
                uploadPlaceholder.classList.add('hidden');
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Remover Imagem Selecionada
    btnRemoveImage.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        previewImg.src = '';
        imagePreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
    });

    // Resetar formulário ajustando a imagem
    form.addEventListener('reset', () => {
        btnRemoveImage.click();
    });

    // Envio do Formulário (Submissão)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        
        // Exemplo de extração dos dados formatados para envio ao Backend/API
        const productData = {
            nomeproduto: formData.get('nomeproduto'),
            categoria: formData.get('categoria'),
            preco: parseFloat(formData.get('preco')),
            descricao: formData.get('descricao'),
            foto: fileInput.files[0] ? fileInput.files[0].name : null
        };

        console.log('Dados do produto prontos para envio:', productData);
        alert('Produto cadastrado com sucesso! (Verifique o console para ver o objeto)');

        // Para enviar a uma API Backend via fetch multipart/form-data:
        /*
        fetch('/api/produtos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao cadastrar:', error));
        */
        
        form.reset();
    });
});