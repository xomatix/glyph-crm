class GlService {
  constructor(baseUrl) {
    if (!GlService.instance) {
      this.baseUrl = baseUrl;
      GlService.instance = this;
    }
    return GlService.instance;
  }

  async select(nameSpace, selectorIdent, data) {
    const processData = (obj) => {
      if (!obj) return obj;
      if (typeof obj === "string") {
        return obj.replaceAll("'", "''");
      }
      if (Array.isArray(obj)) {
        return obj.map((item) => processData(item));
      }
      if (typeof obj === "object") {
        const newObj = {};
        for (let key in obj) {
          newObj[key] = processData(obj[key]);
        }
        return newObj;
      }
      return obj;
    };

    if (data) {
      data = processData(data);
    }
    try {
      const response = await fetch(`${this.baseUrl}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "select",
          data: {
            ...data,
            nameSpace: nameSpace,
            selectorIdent: selectorIdent,
            s_id: localStorage.getItem("s_id"),
          },
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }

  async saveSelector(nameSpace, selectorIdent, selectorFn, pageSize = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "saveSelector",
          data: {
            s_id: localStorage.getItem("s_id"),
            nameSpace: nameSpace,
            selectorIdent: selectorIdent,
            pageSize: Number(pageSize),
            selectorFn: selectorFn.replaceAll("'", "''"),
          },
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }

  async askAi(context_name, prompt, data, ai_model = "gemini") {
    try {
      const response = await fetch(`${this.baseUrl}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: ai_model,
          data: {
            ...data,
            context_name: context_name,
            prompt: prompt,
            s_id: localStorage.getItem("s_id"),
          },
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Fetch POST error:", error);
      throw error;
    }
  }
}

const service = new GlService("http://localhost:8080");
Object.freeze(service);

export default service;
