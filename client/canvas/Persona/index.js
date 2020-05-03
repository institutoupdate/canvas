import React from "react";
import FlexCanvas from "react-flexcanvas";

export default class PersonaCanvas extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="page-description">
          <p>
            Antes de preencher este <strong>Canvas Persona</strong>,
            certifique-se de ter preenchido o <strong>Canvas Eleitoral</strong>.
          </p>
          <p>
            Os itens{" "}
            <strong>Candidata, Princípios, Causas e Compromissos</strong> são a
            base para completar este documento.
          </p>
        </div>
        <FlexCanvas>
          <FlexCanvas.Row>
            <FlexCanvas.Item
              title="Público"
              tip="Uma visão mais geral de um grupo de pessoas que você entende que é seu público. Descrever o gênero, faixa etária, estado civil, nível educacional, renda média, uso de internet etc."
              grow="2"
              color="blue"
            />
            <FlexCanvas.Item
              title="Persona (eleitora ideal)"
              grow="3"
              color="orange"
            >
              <FlexCanvas.Field
                title="Quem?"
                tip="Nome, idade, região que vive, onde trabalha, relação com a família, renda mensal."
              />
              <FlexCanvas.Field
                title="O que faz?"
                tip="Descreva o dia a dia da pessoa, passo a passo, desde o momento que acorda até o momento em que vai deitar. Lembre-se também de descrever seu final de semana."
              />
              <FlexCanvas.Field
                title="Motivação"
                tip="O que faz essa pessoa feliz? O leva ela a realizar algo por vontade própria?"
              />
              <FlexCanvas.Field
                title="Objetivos"
                tip="Quais são os objetivos de vida dessa pessoa? O que ela busca conquistar nos próximos anos?"
              />
              <FlexCanvas.Field
                title="Frustrações"
                tip="O que está presente no dia a dia dessa pessoa e ela não gosta? E na vida? O que faz com que ela se sinta triste e frustrada?"
              />
              <FlexCanvas.Field
                title="Preocupações"
                tip="O que tira o sono dela?"
              />
            </FlexCanvas.Item>
          </FlexCanvas.Row>
        </FlexCanvas>
      </div>
    );
  }
}
