function _1(htl){return(
htl.html`<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0 30px 0;
  margin-bottom: 20px;
  width: 100%;
">
  
  <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: start;">
    
    <div style="flex: 1; min-width: 300px;">
      <h1 style="
        margin: 0 0 10px 0; 
        font-size: 2.2rem; 
        font-weight: 800; 
        letter-spacing: -0.02em; 
        color: #1a1a1a; 
        line-height: 1.1;
      ">
        Representación de mujeres en publicaciones científicas
      </h1>
      <p style="
        margin: 0; 
        font-size: 1.1rem; 
        color: #555; 
        line-height: 1.5; 
        max-width: 600px;
      ">
        Análisis interactivo sobre el impacto en la difusión, el reconocimiento y la producción de conocimiento en el ámbito de la cardiología
      </p>
    </div>

    <div style="flex: 1.2; min-width: 300px;">
      <h3 style="
        margin: 0 0 15px 0; 
        font-size: 0.85rem; 
        text-transform: uppercase; 
        color: #888; 
        letter-spacing: 1px; 
        font-weight: 600;
      ">
        Preguntas Clave del Estudio
      </h3>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        
        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 4px solid #f5576c;">
          <strong style="display: block; font-size: 0.9rem; color: #333; margin-bottom: 2px;">1. ¿Desigualdad en autoría?</strong>
        </div>

        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 4px solid #4facfe;">
          <strong style="display: block; font-size: 0.9rem; color: #333; margin-bottom: 2px;">2. ¿Visibilidad por género?</strong>
        </div>

        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 4px solid #feca57;">
          <strong style="display: block; font-size: 0.9rem; color: #333; margin-bottom: 2px;">3. ¿Impacto mediático?</strong>
        </div>

        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 4px solid #666;">
          <strong style="display: block; font-size: 0.9rem; color: #333; margin-bottom: 2px;">4. ¿Desigualdades por revista/autores/año?</strong>
        </div>

      </div>
    </div>

  </div>
</div>`
)}

function _2(selectedYear,stats,md){return(
md`## Año ${selectedYear}: ${stats.total} artículos analizados

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 10px; color: white; display: flex; align-items: center; gap: 20px;">
    <h2 style="margin: 0; font-size: 3rem; line-height: 1;">♀ ${stats.womenPercent}%</h2>
    
    <div style="display: flex; flex-direction: column; gap: 5px;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: bold; line-height: 1.2;">Mujeres 1ª y última autora</p>
      <div style="font-size: 0.95rem; opacity: 0.95; margin-top: 5px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px;">
        <div> Citas (media): <strong>${stats.womenAvgCites}</strong></div>
        <div> Impacto social: <strong>${stats.womenAvgSocial}</strong></div>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 10px; color: white; display: flex; align-items: center; gap: 20px;">
    <h2 style="margin: 0; font-size: 3rem; line-height: 1;">♂ ${(100 - stats.womenPercent).toFixed(1)}%</h2>
    
    <div style="display: flex; flex-direction: column; gap: 5px;">
      <p style="margin: 0; font-size: 1.2rem; font-weight: bold; line-height: 1.2;">Hombres 1° y último autor</p>
      <div style="font-size: 0.95rem; opacity: 0.95; margin-top: 5px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 5px;">
        <div> Citas (media): <strong>${stats.menAvgCites}</strong></div>
        <div> Impacto social: <strong>${stats.menAvgSocial}</strong></div>
      </div>
    </div>
  </div>

</div>`
)}

function _3(d3,yearData,showComparison,selectedYear)
{
  const width = 928;
  const height = 300;
  const margin = {top: 20, right: 110, bottom: 40, left: 40};
  
  const colors = {
    "women first and last": "#f5576c",
    "men first and last": "#4facfe",
    "mixed gender team": "#feca57"
  };
  
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; max-height: 50vh; cursor: default;"); 
  
  // --- DEFINICIÓN DE ESCALAS ---
  const x = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.cites)])
    .range([margin.left, width - margin.right])
    .nice();
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.social)])
    .range([height - margin.bottom, margin.top])
    .nice();
  
  const size = d3.scaleSqrt()
    .domain([0, d3.max(yearData, d => d.nAuthors)])
    .range([2, 8]);
  
  // --- FONDO ---
  const background = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "transparent")
    .on("click", () => hideInfo());

  // Grid
  svg.append("g")
    .attr("stroke", "#ccc")
    .attr("stroke-opacity", 0.2)
    .style("pointer-events", "none")
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => x(d)).attr("x2", d => x(d))
        .attr("y1", margin.top).attr("y2", height - margin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => y(d)).attr("y2", d => y(d))
        .attr("x1", margin.left).attr("x2", width - margin.right));
  
  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSize(5))
    .call(g => g.append("text")
      .attr("x", width / 2).attr("y", 30)
      .attr("fill", "currentColor").attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text("Número de citas (Impacto Académico)"));
  
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(5))
    .call(g => g.append("text")
      .attr("x", -margin.left).attr("y", 10)
      .attr("fill", "currentColor").attr("text-anchor", "start")
      .attr("font-size", "10px")
      .text("Impacto Social"));

  // --- CÍRCULOS ---
  if (showComparison) {
    const avgData = ["women first and last", "men first and last", "mixed gender team"]
      .map(gender => {
        const subset = yearData.filter(d => d.gender === gender);
        const safeMean = (arr, fn) => { const v = d3.mean(arr, fn); return v === undefined ? 0 : v; };
        return {
          gender,
          avgCites: safeMean(subset, d => d.cites),
          avgSocial: safeMean(subset, d => d.social),
          count: subset.length,
          avgAuthors: safeMean(subset, d => d.nAuthors)
        };
      });
    
    const avgCircles = svg.selectAll("circle.avg")
      .data(avgData)
      .join("circle")
      .attr("cx", d => x(d.avgCites)).attr("cy", d => y(d.avgSocial))
      .attr("r", d => size(d.avgAuthors) * 2) 
      .attr("fill", d => colors[d.gender])
      .attr("opacity", 0.9)
      .attr("stroke", "#333").attr("stroke-width", 1)
      .style("cursor", "pointer");

    avgCircles.on("click", (event, d) => {
      event.stopPropagation();
      avgCircles.attr("opacity", 0.2);
      d3.select(event.currentTarget).attr("opacity", 1).attr("stroke", "#000").raise();
      showInfo(d, x(d.avgCites), y(d.avgSocial), true);
    });
    
    const offsets = {
      "women first and last": { dx: 0, dy: 28, align: "middle" },
      "men first and last":   { dx: 28, dy: 6, align: "start" },
      "mixed gender team":    { dx: -28, dy: 6, align: "end" }
    };
    
    svg.selectAll("text.label")
      .data(avgData)
      .join("text")
      .attr("class", "label")
      .attr("x", d => x(d.avgCites) + offsets[d.gender].dx)
      .attr("y", d => y(d.avgSocial) + offsets[d.gender].dy)
      .attr("text-anchor", d => offsets[d.gender].align) 
  
      .style("fill", d => colors[d.gender])
      .style("font-weight", "900")
      .style("font-size", "12px")
      .style("stroke", "white")
      .style("stroke-width", 4)
      .style("paint-order", "stroke")
      
      .text(d => d.gender === "women first and last" ? `♀ MUJERES` : 
                 d.gender === "men first and last" ? `♂ HOMBRES` : `⚥ MIXTO`);

  } else {
    // --- MODO NORMAL ---
    const circles = svg.selectAll("circle")
      .data(yearData)
      .join("circle")
      .attr("cx", d => x(d.cites))
      .attr("cy", d => y(d.social))
      .attr("r", d => size(d.nAuthors))
      .attr("fill", d => colors[d.gender] || "#999")
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .style("cursor", "pointer");

    circles.on("click", (event, d) => {
      event.stopPropagation();
      circles.attr("opacity", 0.1);
      d3.select(event.currentTarget)
        .attr("opacity", 1)
        .attr("stroke", "#000")
        .raise();
      showInfo(d, x(d.cites), y(d.social));
    });
  }

  // --- INFO BOX ---
  const infoGroup = svg.append("g")
    .attr("opacity", 0)
    .style("pointer-events", "none");

  const infoBg = infoGroup.append("rect")
    .attr("fill", "white")
    .attr("stroke", "#333")
    .attr("stroke-width", 1)
    .attr("rx", 5)
    .attr("filter", "drop-shadow(2px 2px 2px rgba(0,0,0,0.2))");

  const infoText = infoGroup.append("text")
    .attr("font-size", "10px")
    .attr("fill", "#333");

  function showInfo(d, cx, cy, isComparison = false) {
    infoText.selectAll("*").remove();
    let lines;
    if (isComparison) {
      const label = d.gender === "women first and last" ? "PROMEDIO MUJERES" : 
                    d.gender === "men first and last" ? "PROMEDIO HOMBRES" : "PROMEDIO MIXTO";
      lines = [
        label,
        `Total Artículos: ${d.count}`,
        `Citas (media): ${d.avgCites.toFixed(1)}`,
        `Imp. Social (media): ${d.avgSocial.toFixed(2)}`,
        `Autores (media): ${d.avgAuthors.toFixed(1)}`
      ];
    } else {
      lines = [
        d.journal.length > 25 ? d.journal.substring(0, 25) + "..." : d.journal,
        `Autores: ${d.nAuthors}`,
        `Citas: ${d.cites.toFixed(0)}`,
        `Imp. Social: ${d.social.toFixed(2)}`
      ];
    }

    lines.forEach((line, i) => {
      infoText.append("tspan")
        .attr("x", 8)
        .attr("dy", i === 0 ? "1.2em" : "1.2em")
        .attr("font-weight", i === 0 ? "bold" : "normal")
        .attr("fill", (i === 0 && isComparison) ? colors[d.gender] : "#333")
        .text(line);
    });

    const bbox = infoText.node().getBBox();
    const padding = 6;
    infoBg
      .attr("width", bbox.width + padding * 2)
      .attr("height", bbox.height + padding * 2);

    let xPos = cx + 12;
    let yPos = cy - 12;
    if (xPos + bbox.width > width) xPos = cx - bbox.width - 15;
    if (yPos + bbox.height > height) yPos = cy - bbox.height;

    infoGroup
      .attr("transform", `translate(${xPos}, ${yPos})`)
      .attr("opacity", 1)
      .raise();
  }

  function hideInfo() {
    infoGroup.attr("opacity", 0);
    svg.selectAll("circle").attr("opacity", 0.6).attr("stroke", "#fff");
  }
  
  // --- LEYENDA Y TÍTULO ---
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);
  
  [["women first and last", "♀ Mujeres"], ["men first and last", "♂ Hombres"], ["mixed gender team", "⚥ Mixto"]]
    .forEach(([gender, label], i) => {
      const g = legend.append("g").attr("transform", `translate(0, ${i * 18})`);
      g.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 4).attr("fill", colors[gender]);
      g.append("text").attr("x", 8).attr("y", 3).attr("font-size", "11px").text(label);
    });

  svg.append("text")
    .attr("x", width/2).attr("y", 15)
    .attr("text-anchor", "middle").attr("font-size", "14px").attr("font-weight", "bold")
    .text(`Impacto Científico por Género - ${selectedYear}`);
  
  return svg.node();
}


function _dashboard(d3,processedData,Inputs,htl)
{
  const maxAuthors = d3.max(processedData, d => d.nAuthors);
  const journalsList = ["Todas", ...Array.from(new Set(processedData.map(d => d.journal || "Desconocido"))).sort()];

  const yearInput = Inputs.range([2015, 2021], { step: 1, value: 2018, label: " Año" });
  
  const compareInput = Inputs.toggle({ label: "Modo Comparativo", value: false });

  const authorsInput = Inputs.radio(new Map([
    ["Todos", [1, maxAuthors]],
    ["< 5", [1, 4]],
    ["5-10", [5, 10]],
    ["10-20", [11, 20]],
    ["> 20", [21, maxAuthors]] 
  ]), {
    label: " Número de autores"
  });

  const journalsInput = Inputs.radio(journalsList, {
    label: " Revistas",
    value: "Todas",
    format: x => x === "Todas" ? "Todas las revistas" : x
  });

  return Inputs.form({
    selectedYear: yearInput,
    showComparison: compareInput,
    authorRange: authorsInput,
    selectedJournals: journalsInput
  }, {
    template: (inputs) => htl.html`
    <div style="font-family: sans-serif; background: #fdfdfd; border: 1px solid #ccc; border-radius: 8px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      
      <div style="display: flex; gap: 30px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
        <div style="flex-grow: 1;">${inputs.selectedYear}</div>
        <div style="font-weight: bold;">${inputs.showComparison}</div>
      </div>

      <div style="display: flex; gap: 40px; flex-wrap: wrap;">
        
        <div style="flex: 0 0 auto; min-width: 150px;">
          ${inputs.authorRange}
        </div>

        <div style="flex: 1; border-left: 1px solid #eee; padding-left: 20px;">
          <div style="max-height: 150px; overflow-y: auto;">
            ${inputs.selectedJournals}
          </div>
        </div>

      </div>
    </div>`
  });
}


function _5(md){return(
md`Base de datos disponible en: [Harvard Dataverse](https://dataverse.harvard.edu/file.xhtml?fileId=7161806&datasetVersionId=346106)`
)}

function _gender_disparities_aas_cardio(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Gender_disparities_AAS_cardio.csv"),{from:{table:"Gender_disparities_AAS_cardio"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _data(FileAttachment){return(
FileAttachment("Gender_disparities_AAS_cardio.csv").csv({typed: true})
)}

function _processedData(data){return(
data.map(d => ({
  year: +d.publication_year,
  journal: d.journal_id,
  nAuthors: +d.n_authors,
  cites: Math.exp(+d.log_cites || 0),
  social: ((+d.log_twitter_all || 0) + (+d.log_news || 0) + (+d.log_policy || 0)) + (+d.log_wiki || 0) + (+d.log_blogs || 0)/ 5,
  gender: d.gender_combination || 'unknown'
})).filter(d => d.year && d.journal)
)}

function _stats(yearData,d3)
{
  const women = yearData.filter(d => d.gender === "women first and last");
  const men = yearData.filter(d => d.gender === "men first and last");
  
  // Función auxiliar segura para evitar errores
  const safeMean = (arr, fn) => {
    const val = d3.mean(arr, fn);
    return val === undefined ? 0 : val;
  };
  
  // Evitar división por cero en el porcentaje
  const total = yearData.length || 1; 

  return {
    total: yearData.length,
    womenCount: women.length,
    menCount: men.length,
    womenPercent: ((women.length / total) * 100).toFixed(1),
    
    // Usamos safeMean para que si no hay datos devuelva 0 en lugar de error
    womenAvgCites: safeMean(women, d => d.cites).toFixed(0),
    menAvgCites: safeMean(men, d => d.cites).toFixed(0),
    womenAvgSocial: safeMean(women, d => d.social).toFixed(2),
    menAvgSocial: safeMean(men, d => d.social).toFixed(2)
  };
}


function _yearData(processedData,selectedJournals,selectedYear,authorRange)
{
  if (!processedData || processedData.length === 0) return [];
  
  // Normalizamos inputs para evitar errores nulos
  const currentJournal = selectedJournals || "Todas";
  const currentYear = selectedYear; 
  // Si authorRange falla, asumimos rango completo [0, 1000]
  const [minAuth, maxAuth] = (authorRange && authorRange.length === 2) ? authorRange : [0, 1000];

  console.log("--- DEBUG FILTROS ---");
  console.log(`Buscando: Año=${currentYear}, Revista=${currentJournal}, Autores=${minAuth}-${maxAuth}`);
  
  // Comprobamos el primer dato para ver qué tiene
  const primerDato = processedData[0];
  console.log("Ejemplo de dato real:", primerDato);
  console.log("¿Coincide año?", primerDato.year === currentYear);
  console.log("¿Coincide revista?", currentJournal === "Todas" || primerDato.journal === currentJournal);

  // --- FILTRADO ---
  return processedData.filter(d => {
    // 1. Año
    const matchYear = d.year == currentYear; 

    // 2. Revista
    const matchJournal = currentJournal === "Todas" || d.journal === currentJournal;

    // 3. Autores
    const matchAuthors = d.nAuthors >= minAuth && d.nAuthors <= maxAuth;

    return matchYear && matchJournal && matchAuthors;
  });
}


function _selectedYear(dashboard){return(
dashboard.selectedYear
)}

function _showComparison(dashboard){return(
dashboard.showComparison
)}

function _authorRange(dashboard){return(
dashboard.authorRange
)}

function _selectedJournals(dashboard){return(
dashboard.selectedJournals
)}

function _15(html){return(
html`<style>
/* 1. Romper el límite de ancho del contenedor principal */
.observablehq {
  max-width: none !important; /* Quita el límite de 640px/1200px */
  width: 100% !important;
  padding: 0 20px !important; /* Un poco de margen a los lados */
  box-sizing: border-box;
}

/* 2. Asegurar que los hijos (celdas) ocupen el 100% */
.observablehq > div {
  max-width: 100% !important;
  width: 100% !important;
}

/* 3. Arreglar el texto Markdown específicamente */
.observablehq--md, .observablehq-md {
  max-width: 100% !important; 
}
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Gender_disparities_AAS_cardio.csv", {url: new URL("./files/651a8d837e840b2b8da6a6871cbae9eb35f5ef558447d9dd19bdedbc7c1922f4004ee36d1bac0708de89760e406ee1f0740b474fb44f9bf674fb5ef7f6bdb575.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["htl"], _1);
  main.variable(observer()).define(["selectedYear","stats","md"], _2);
  main.variable(observer()).define(["d3","yearData","showComparison","selectedYear"], _3);
  main.variable(observer("viewof dashboard")).define("viewof dashboard", ["d3","processedData","Inputs","htl"], _dashboard);
  main.variable(observer("dashboard")).define("dashboard", ["Generators", "viewof dashboard"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("gender_disparities_aas_cardio")).define("gender_disparities_aas_cardio", ["__query","FileAttachment","invalidation"], _gender_disparities_aas_cardio);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("processedData")).define("processedData", ["data"], _processedData);
  main.variable(observer("stats")).define("stats", ["yearData","d3"], _stats);
  main.variable(observer("yearData")).define("yearData", ["processedData","selectedJournals","selectedYear","authorRange"], _yearData);
  main.variable(observer("selectedYear")).define("selectedYear", ["dashboard"], _selectedYear);
  main.variable(observer("showComparison")).define("showComparison", ["dashboard"], _showComparison);
  main.variable(observer("authorRange")).define("authorRange", ["dashboard"], _authorRange);
  main.variable(observer("selectedJournals")).define("selectedJournals", ["dashboard"], _selectedJournals);
  main.variable(observer()).define(["html"], _15);
  return main;
}
