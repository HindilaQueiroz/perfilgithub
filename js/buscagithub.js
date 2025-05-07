
        function buscarUsuario() {
            const usuario = document.getElementById('usuario').value;
            const resultadoDiv = document.getElementById('resultado');
            const mensagemDiv = document.getElementById('mensagem');
            const caixaErro = document.getElementById('caixa-erro');
        
            if (!usuario) {
                alert("Por favor, insira um nome de usuário.");
                return;
            }
        
            fetch(`https://api.github.com/users/${usuario}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.');
                    }
                    return response.json();
                })
                .then(data => {
                    resultadoDiv.style.display = 'block';
                    caixaErro.style.display = 'none';
                    mensagemDiv.innerHTML = '';
        
                    resultadoDiv.innerHTML = `
                    <div class="perfil-conteudo">
                      <img src="${data.avatar_url}" alt="Imagem de perfil" class="imagem-foto-perfil">
                      <div class="group-texto-perfil">
                        <h2 class="titulo-texto">${data.name ? data.name : data.login}</h2>
                        <p class="texto">${data.bio ? data.bio : "Sem bio disponível."}</p>
                      </div>
                    </div>
                  `;
                })
                
                .catch(error => {
                    resultadoDiv.style.display = 'none';
                    caixaErro.style.display = 'block';
                    mensagemDiv.innerHTML = `<p>${error.message}</p>`;
                });
        }