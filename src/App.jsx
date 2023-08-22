// import {useState} from "react";

// function App(){
	
// 	// const [ alias, setAlias ] 	    = useState("");
// 	// const [ msg, setMsg ]   	   	= useState("");
// 	// const [ category, setCategory ] = useState("");
	
// 	// state version optimisé
// 	const [ inputs, setInputs]  	= useState({alias: "", msg: "", category: ""});


// 	const [ errorMsg, setErrorMsg ] = useState(null);

// 	const [ dataLS, setDataLS ] = useState(JSON.parse(localStorage.getItem("data")) || []);
	
// 	// function handleChangeAlias({target:{value}}){
// 	// 	setAlias(value);
// 	// }
// 	// function handleChangeMsg({target:{value}}){
// 	// 	setMsg(value);
// 	// }
// 	// function handleChangeCategory({target:{value}}){
// 	// 	setCategory(value);
// 	// }

// 	// function checkMissingInput(){
// 	// 	if(!alias) return "Renseignez votre alias !";
// 	// 	if(!msg) return "Renseignez la description !";
// 	// 	if(!category) return "Renseignez la catégorie !";
// 	// }

// 	function submitHandler(e){
// 		e.preventDefault();
// 		if(!alias || !msg || !category) {
// 			setErrorMsg(checkMissingInput());
// 			return;
// 		}
// 		// est exécuté lors de la soumission du formulaire, l'input en type submit déclenche l'attribut event onSubmit sur l'élément form
// 		console.log("pret a envoyer dans le LS");
// 		setErrorMsg("");
// 		console.log(dataLS)
// 		localStorage.setItem("data", JSON.stringify([...dataLS, {alias, msg, category}]));
// 		setDataLS(JSON.parse(localStorage.getItem("data")));
// 	}

// 	return (
// 		<>
// 			<h1>exo FORM LS</h1>
// 			<form onSubmit={submitHandler}>

// 				<input placeholder="votre alias" type="text" name="alias" value={alias} onChange={handleChangeAlias} />
// 				<textarea name="msg" value={msg} onChange={handleChangeMsg} />
// 				<select name="category" onChange={handleChangeCategory}>
// 					<option value="">Choisir une catégorie :</option>
// 					<option value="multimedia">Multimédia</option>
// 					<option value="vetement">Vêtement</option>
// 					<option value="jardin">Jardin</option>
// 				</select>

// 				<input type="submit" value="register to local storage" />
// 				{errorMsg && <p>{errorMsg}</p>}
// 			</form>

// 			<hr />
// 			{
// 				dataLS.length ? (
// 					<>
// 					<h2>Liste :</h2>
// 					<dl>
// 						{
// 							dataLS.map(data => 
// 								<>
// 								<dt>Message de : {data.alias} dans la catégorie {data.category}</dt>
// 								<dd>{data.msg}</dd>
// 								<div className="divider"></div>
// 								</>
// 							)
// 						}
// 					</dl>
// 					<hr />
// 					</>
// 				)
// 				: <p>rien dans le LS</p>
// 			}


// 		</>
// 	)
// }


// export default App;

// VERSION OPTIMISE
import { useReducer, useState, Fragment } from "react";

function App(){
	const [ inputs, dispatch] = useReducer((currentInputs, newInputsValues) => ({...currentInputs, ...newInputsValues}), {alias: "", msg: "", category: ""} );
	const [ errorMsg, setErrorMsg ] = useState(null);

	const [ dataLS, setDataLS ] = useState(JSON.parse(localStorage.getItem("data")) || []);
	
	function handleChangeInputs({target: {name, value}}){
		dispatch({[name]: value});
	}
	
	function checkMissingInput(key){		
		if(!inputs[key]) return true;
	}

	function submitHandler(e){
		e.preventDefault();
		for (const key in inputs) {
			if(checkMissingInput(key)) {
				setErrorMsg(`Veuillez renseigner le champs ${key}`);
				return;
			}
		}
		setErrorMsg("");
		const {alias, msg, category} = inputs;
		localStorage.setItem("data", JSON.stringify([...dataLS, {alias, msg, category}]));
		setDataLS(JSON.parse(localStorage.getItem("data")));
	}

	return (
		<>
			<h1>exo FORM LS</h1>
			<form onSubmit={submitHandler}>

				<input placeholder="votre alias" type="text" name="alias" value={inputs.alias} onChange={handleChangeInputs} />
				<textarea name="msg" value={inputs.msg} onChange={handleChangeInputs} />
				<select name="category" onChange={handleChangeInputs}>
					<option value="">Choisir une catégorie :</option>
					<option value="multimedia">Multimédia</option>
					<option value="vetement">Vêtement</option>
					<option value="jardin">Jardin</option>
				</select>

				<input type="submit" value="register to local storage" />
				{errorMsg && <p>{errorMsg}</p>}
			</form>

			<hr />
			{
				dataLS.length ? (
					<>
					<h2>Liste :</h2>
					<dl>
						{
							dataLS.map(data => 
								<Fragment key={Math.random()}>
								<dt>Message de : {data.alias} dans la catégorie {data.category}</dt>
								<dd>{data.msg}</dd>
								<div className="divider"></div>
								</Fragment>
							)
						}
					</dl>
					<hr />
					</>
				)
				: <p>rien dans le LS</p>
			}


		</>
	)
}


export default App;