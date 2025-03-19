class GlService {
  constructor(baseUrl) {
    if (!GlService.instance) {
      this.baseUrl = baseUrl;
      GlService.instance = this;
    }
    return GlService.instance;
  }

  async select(nameSpace, selectorIdent, data) {
    try {
      const response = await fetch(`${this.baseUrl}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "select",
          data: { ...data, nameSpace: nameSpace, selectorIdent: selectorIdent },
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
