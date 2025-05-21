import React, { useEffect, useState } from "react";
import { formatIDR, parseIDR } from "../Helpers";

export function RecommendedFoods() {
  const [uang_jajan, setUangJajan] = useState(0);
  const daftar_menu = [
    { id: 1, name: "Mie ayam", price: 15000 },
    { id: 2, name: "Bakso urat", price: 13000 },
    { id: 3, name: "Indomie", price: 10000 },
    { id: 4, name: "Es teh", price: 5000 },
    { id: 5, name: "Es Jeruk", price: 8000 },
  ];

  const getAllCombinations = (arr) => {
    const result = [];
    const f = (prefix = [], arr) => {
      for (let i = 0; i < arr.length; i++) {
        const newPrefix = [...prefix, arr[i]];
        result.push(newPrefix);
        f(newPrefix, arr.slice(i + 1));
      }
    };
    f([], arr);
    return result;
  };

  const filterCombinationsByBudget = (combinations, budget) => {
    return combinations.filter((combination) => {
      const total = combination.reduce((sum, item) => sum + item.price, 0);
      return total <= budget;
    });
  };

  

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const allCombinations = getAllCombinations(daftar_menu);
    const validCombinations = filterCombinationsByBudget(
      allCombinations,
      uang_jajan
    );
    setRecommendations(validCombinations);
  }, [uang_jajan]);

  return (
    <div className="rekomendasi-uang-jajan">
      <div className="row">
        <div className="col-4">
            <h3>Daftar Menu Kantin</h3>
            <ul>
                {daftar_menu.map((v,index)=>(
                    <li className="nav-item" key={index}>
                        {v.name} {formatIDR(v.price)}
                    </li>
                ))}
            </ul>
        </div>
        <div className="col-8">
          <div className="form-group mb-8">
            <label>Masukan uang jajan anda:</label>
            <div className="input-group">
              <span className="input-group-text">Rp.</span>
              <input
                type="text"
                className="form-control"
                defaultValue={uang_jajan}
                onChange={(e) => setUangJajan(parseIDR(e.target.value))}
              />
            </div>
          </div>
          <h1>Rekomendasi Menu</h1>
          {recommendations.length > 0 ? (
            recommendations.map((combo, index) => (
              <div key={index}>
                <h2>Rekomendasi {index + 1}:</h2>
                <ul>
                  {combo.map((item) => (
                    <li key={item.id}>
                      {item.name} - {formatIDR(item.price)}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Tidak ada rekomendasi yang cocok.</p>
          )}
        </div>
      </div>
    </div>
  );
}
