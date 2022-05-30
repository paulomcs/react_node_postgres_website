import React, { useRef, useState } from "react";
import apiClient from "./services/api";

export default function App() {
  const post_title = useRef(null);
  const post_description = useRef(null);
  const [postResult, setPostResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  async function postData() {
    const postData = {
      title: post_title.current.value,
      description: post_description.current.value,
    };
    try {
      const res = await apiClient.post("/teste", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }
  const clearPostOutput = () => {
    setPostResult(null);
  };
  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">Cadastrar Eventos:</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={post_title} placeholder="Nome do evento" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={post_description} placeholder="descrição do evento" />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>Criar!</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>
          { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
        </div>
      </div>
    </div>
  );
}