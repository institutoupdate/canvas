import React from "react";
import FlexCanvas from "react-flexcanvas";
import Details from "./Details";

export default class ElectoralCanvas extends React.Component {
  render() {
    return (
      <FlexCanvas>
        <FlexCanvas.Row widths="equal" color="blue" attached="top">
          <FlexCanvas.Item title="Nome da candidata" color="blue" />
          <FlexCanvas.Item title="Cargo a que concorre" color="blue" />
          <FlexCanvas.Item title="Local" color="blue" />
          <FlexCanvas.Item title="Partido" color="blue" />
          <FlexCanvas.Item title="Número" color="blue" />
        </FlexCanvas.Row>
        <FlexCanvas.Row grow={10}>
          <FlexCanvas.Column grow={5}>
            <FlexCanvas.Row grow={2}>
              <FlexCanvas.Item
                title="Princípios"
                color="pink"
                grow={1}
                details={<Details.Principles />}
              >
                <FlexCanvas.List title="Princípio" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Candidata"
                color="pink"
                grow={2}
                featured
                details={<Details.Candidate />}
              >
                <FlexCanvas.FieldGroup>
                  <FlexCanvas.Field title="Característica positiva" />
                  <FlexCanvas.Field title="Característica negativa" />
                </FlexCanvas.FieldGroup>
                <FlexCanvas.FieldGroup>
                  <FlexCanvas.Field title="Um talento" />
                  <FlexCanvas.Field title="Uma limitação" />
                </FlexCanvas.FieldGroup>
                <FlexCanvas.Field title="Uma experiência de vida" grow={2} />
              </FlexCanvas.Item>
              <FlexCanvas.Item title="Canais" details={<Details.Channels />}>
                <FlexCanvas.Field title="Redes sociais" />
                <FlexCanvas.Field title="Outras ferramentas" />
                <FlexCanvas.Field title="Redes temáticas e territoriais" />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
            <FlexCanvas.Row grow={2}>
              <FlexCanvas.Item
                title="Causas"
                color="pink"
                grow={1}
                details={<Details.Causes />}
              >
                <FlexCanvas.List title="Causa" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Compromissos"
                color="pink"
                grow={1}
                details={<Details.Commitments />}
              >
                <FlexCanvas.List title="Compromisso" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Eleitorado"
                color="red"
                grow={2}
                details={<Details.Electorate />}
              >
                <FlexCanvas.List title="Perfil" amount={3} />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Diferenciais de campanha"
                grow={1}
                details={<Details.Assets />}
              >
                <FlexCanvas.Field title="O que eu tenho que meus competidores não têm" />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
            <FlexCanvas.Row grow={1}>
              <FlexCanvas.Item
                title="Quanto vai custar sua campanha?"
                grow={2.5}
                color="green"
                details={<Details.Expense />}
              >
                <FlexCanvas.Field title="Valor total de custo" />
              </FlexCanvas.Item>
              <FlexCanvas.Item
                title="Como você vai arrecadar?"
                grow={4.5}
                color="green"
                details={<Details.Funders />}
              >
                <FlexCanvas.Field title="Lista de atividades de captação de recursos" />
              </FlexCanvas.Item>
            </FlexCanvas.Row>
          </FlexCanvas.Column>
          <FlexCanvas.Column>
            <FlexCanvas.Item grow="1" title="Meta de votos" />
            <FlexCanvas.Item
              grow="5"
              title="Redes pessoais"
              details={<Details.PersonalNetwork />}
            >
              <FlexCanvas.Field title="30 primeiros votos" grow="2" />
              <FlexCanvas.Field title="10 pessoas que se envolverão na campanha" />
              <FlexCanvas.Field title="Influenciadores ao seu alcance" />
            </FlexCanvas.Item>
            <FlexCanvas.Item
              grow="3"
              title="Competidores"
              details={<Details.Competitors />}
            >
              <FlexCanvas.Table columns={["Nome", "Partido"]} />
            </FlexCanvas.Item>
          </FlexCanvas.Column>
        </FlexCanvas.Row>
      </FlexCanvas>
    );
  }
}
