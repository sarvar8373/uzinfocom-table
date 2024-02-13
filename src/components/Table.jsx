import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Datas from "./data.json";

const Tables = () => {
  const [data, setData] = useState([]);
  const columnHeaders = [
    { label: "Республика бюджетига тушум (млрд сўм)", colspan: 3 },
    { label: "Маҳаллий бюджетига тушум (млрд сўм)", colspan: 3 },
    {
      label: "Ташаббусли бюджетига жамғармасига маблағ ўтказиш (млн сўм)",
      colspan: 3,
    },
    {
      label:
        "“Ёшлар дафтари”да белгиланган мақсадлар учун ажратилган маблағлар",
      colspan: 3,
    },
    {
      label:
        "“Аёллар дафтари”да белгиланган мақсадлар учун ажратилган маблағлар",
      colspan: 3,
    },
    { label: "Бандлиги таъминланган ишсизлар", colspan: 3 },
    { label: "Ҳоким ёрдамчилари фаолиятининг самарадорлиги", colspan: 3 },
    {
      label: "Тўғридан-тўғри инвестицияларни жалб қилиш (минг доллар)",
      colspan: 3,
    },
    {
      label:
        "Ҳудудий инвестиция дастури доирасида лойиҳаларни ишга тушириш (млрд сўм)",
      colspan: 3,
    },
    { label: "Cаноат маҳсулотлари (минг доллар)", colspan: 3 },
    {
      label: "Мева-сабзавотлар ва полиз экинлари (экспорт) (минг доллар)",
      colspan: 3,
    },
    { label: "Яратилган иш ўринлари (сони)", colspan: 3 },
    {
      label:
        "Инвестиция дастурларидаги белгиланган вазифаларнинг ижросини таъминлаш (млн сўм)",
      colspan: 3,
    },
    { label: "Мавжуд чиқинди қутилари ва уларнинг холати (балл)", colspan: 3 },
    { label: "Яшил боғлар ташкил қилиш (гектар)", colspan: 3 },
    {
      label:
        "Яшил боғларни ташкил этишдаги экилган кўчатлар тутиш (кўкариш) даражаси (фоиз)",
      colspan: 3,
    },
    {
      label: "Аҳолини ичимлик суви билан таъминланганлик даражаси (фоиз)",
      colspan: 3,
    },
    {
      label: "Мактабгача таълим билан қамраб олиш даражаси (фоиз)",
      colspan: 3,
    },
    {
      label:
        "Маҳалладаги ёшлар етакчиларининг фаолият самарадорлиги натижаси (фоиз)",
      colspan: 3,
    },
    {
      label:
        "Ёшларга кўрсатилган ёрдамлар (дафтарга киритилганларга нисбатан) (фоиз)",
      colspan: 3,
    },
    {
      label:
        "Ҳудудда маданият, интеллектуал, спорт ва ватанпарварлик тадбирлари ташкил этилганлиги (сони)",
      colspan: 3,
    },
    {
      label:
        "Ҳудуддаги мактабларнинг сонига нисбатан яшил мактаблар улуши (фоиз)",
      colspan: 3,
    },
    {
      label:
        "100 минг нафар тирик туғилганларга нисбатан оналар ўлими коэффиценти (промилле)",
      colspan: 3,
    },
    {
      label:
        "1000 нафар тирик туғилганларга нисбатан чақалоқлар ўлими коэффиценти (промилле)",
      colspan: 3,
    },
    {
      label: "Маҳалладаги хотин-қизлар фаолларини фаолият натижадорлиги (фоиз)",
      colspan: 3,
    },
    {
      label:
        "“Аёллар дафтари”га киритилган хотин-қизларга кўрсатилган ёрдамлар (сони)",
      colspan: 3,
    },
    {
      label:
        "Ишлаш истаги мавжуд меҳнатга лаёқатли ишсиз аёллар сонидан бандлиги таъминланган аёлларнинг улуши (фоиз)",
      colspan: 3,
    },
    {
      label:
        "Тадбиркорликка ўқитилган хотин-қизлар сонидан тадбиркорлик фаолиятини бошлаган хотин-қизлар улуши (сони)",
      colspan: 3,
    },
    {
      label:
        "Қайд этилган ажримларнинг (1000 та оилалар сонига нисбатан даражаси) (промилле)",
      colspan: 3,
    },
    {
      label:
        "Хотин-қизлар ўртасида содир этилган маҳалла жиноятчилик даражаси (1000 та аёлга нисбатан) (промилле)",
      colspan: 3,
    },
    {
      label:
        "Хотин-қизларга нисбатан тазйиқ ва зўравонликни қисқартириш (сони)",
      colspan: 3,
    },
    {
      label: "Деҳқончилик маҳсулотлари ўсиш суръати (фоиз)",
      colspan: 3,
    },
    {
      label: "Чорвачилик маҳсулотларининг ўсиш суръати (фоиз)",
      colspan: 3,
    },
    {
      label: "Балиқ маҳсулотларини ишлаб чиқариш ҳажмини ўсиш суръати (фоиз)",
      colspan: 3,
    },
    {
      label:
        "Мева-сабзавот ва полиз экинларини етиштириш (экспорт учун) (млн доллар)",
      colspan: 3,
    },
    {
      label: "Сув тежовчи технологиялар жорий этиладиган майдон (гектар)",
      colspan: 3,
    },
    {
      label: "Томорқа фаолиятининг ўсиш суръатлари\r\n (фоиз)",
      colspan: 3,
    },
    {
      label: "Мева-сабзавотни қайта ишлаш даражаси (фоиз)",
      colspan: 3,
    },
    {
      label: "Гўштни ва сутни қайта ишлаш даражаси (фоиз)",
      colspan: 3,
    },
    {
      label: "Йўлларнинг таъмирланганлик даражаси (фоиз)",
      colspan: 3,
    },
    {
      label: "Ҳудуддаги қабристонларни ободонлаштириш (балл)",
      colspan: 3,
    },
    {
      label: "Ёшлар билан ҳар чоракда ўтказилган учрашувлар сони (сони)",
      colspan: 3,
    },
    {
      label: "Ҳудуддаги қабристонларни ободонлаштириш (млн сўм)",
      colspan: 3,
    },
    {
      label: "Ёшлар билан ҳар чоракда ўтказилган учрашувлар сони (млн сўм)",
      colspan: 3,
    },
    {
      label: "",
    },
  ];
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(Datas);
      }, 1000);
    };

    fetchData();
  }, []);

  // Calculate total plan and fact sums
  const totalPlan = data.reduce(
    (accumulator, region) =>
      accumulator + parseFloat(region.indicators[0].plan),
    0
  );
  const totalFact = data.reduce(
    (accumulator, region) =>
      accumulator + parseFloat(region.indicators[0].fact),
    0
  );

  return (
    <Table striped bordered hover size="sm">
      <thead style={{ backgroundColor: "#D5D3B7" }}>
        <tr>
          <th>№</th>
          <th>Вилоят</th>
          <th>Туман/шаҳар</th>
          {columnHeaders.map((header, index) => (
            <th key={index} colSpan={header.colspan || 1}>
              {header.label}
            </th>
          ))}
        </tr>
        <tr>
          {/* Render the same set of header cells for each row of data */}
          {columnHeaders.map((header, index) => (
            <React.Fragment key={index}>
              <th>Режа</th>
              <th>Факт</th>
              <th>Бажарилиши</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowdata, index) => (
          <tr key={index}>
            <td colSpan={3}>{rowdata.district_name}</td>
            {rowdata.indicators.map((indicator, index) => (
              <React.Fragment key={index}>
                <td>{indicator.plan}</td>
                <td>{indicator.fact}</td>
                <td>
                  {typeof indicator.percent === "string"
                    ? parseFloat(indicator.percent).toFixed(2)
                    : indicator.percent}
                </td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tables;
