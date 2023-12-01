//Quem não te seguiu

// Defina uma variável para rastrear a última altura da página
var lastPageHeight = 0;

var contasProcessadas = 0;


const $confirmButton = '[data-testid="confirmationSheetConfirm"]';

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Rola a página para baixo a cada 10 segundos
var intervalId = setInterval(function () {
    window.scrollTo(0, document.body.scrollHeight);

    // Verifica se a altura da página não mudou desde a última rolagem
    if (document.body.scrollHeight === lastPageHeight) {
        console.log("Chegou ao final da rolagem. Finalizando o script.");
        clearInterval(intervalId); // Isso interromperá a execução do código
    } else {
        lastPageHeight = document.body.scrollHeight;
    }

    // Seleciona o agrupador principal
    var agrupadorPrincipalElements = document.querySelectorAll("div.css-175oi2r.r-ymttw5.r-1f1sjgu.r-o7ynqc.r-6416eg.r-1ny4l3l");

    // Constrói uma lista CSV com cabeçalho
    var csvData = "Nome,Endereço,Mensagem,Seguindo\n";

    agrupadorPrincipalElements.forEach(function (agrupadorPrincipal) {
        // ... (seu código anterior)
       // Seleciona o elemento dentro do endereço usando um seletor mais específico
       var mensagemElement = agrupadorPrincipal.querySelector("div.css-175oi2r.r-1awozwy.r-z2wwpe.r-6koalj.r-1q142lx");
       var followButton =    agrupadorPrincipal.querySelector('[data-testid$="-unfollow"]');

       if (!mensagemElement){

        Promise.all([
            Promise.resolve().then(async () => {
               followButton && followButton.click();
               await sleep({ seconds: 1 });
            }),
            Promise.resolve().then(async () => {
               const confirmButton = document.querySelector($confirmButton);
               confirmButton && confirmButton.click();
            })
         ]);      

         // Incrementa o número de contas processadas
         contasProcessadas++;

         // Verifica se atingiu o limite de 1000 contas
         if (contasProcessadas >= 1000) {
             console.log("Limite de 1000 contas atingido. Finalizando o script.");
             clearInterval(intervalId); // Isso interromperá a execução do código
         }
       }
      });

    // Exibe a lista CSV no console (você pode ajustar esta parte conforme necessário)
    //console.log(csvData);
}, 5000);
