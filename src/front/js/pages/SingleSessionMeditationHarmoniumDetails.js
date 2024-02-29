import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/singleDetails.css";
import { SessionMeditationHarmoniumDetailsCard } from "../component/SessionMeditationHarmoniumDetailsCard";

export const SingleSessionMeditationHarmoniumDetails = () => {
	const { store, actions } = useContext(Context);

	// Creamos un espacio para guardar los params de la ruta creada.
	const params = useParams();

	useEffect(() => {
		actions.getOneYogatypeSession(params.yogatype, params.theid)
		// console.log("Store in JivamutkiYogaDetailsCard:", store.singleSessionInfo.name);
		// console.log(params.yogatype)
		// Envias a la función la parte que coge la url dinamica y se lo pasas al flux como parametro.

	}, [])

	return (
		<div className="jumbotron align-items-center container-fluid h-100 pb-5 pt-4 stylebackground my-5">
			<div className=" h-100 w-100">
				<SessionMeditationHarmoniumDetailsCard
					id={store.singleSessionInfo.id}
					name={store.singleSessionInfo.name}
					subtitle={store.singleSessionInfo.subtitle}
					description={store.singleSessionInfo.description}
					instructor={store.singleSessionInfo.instructor}
					duration={store.singleSessionInfo.duration}
					url_imagen={store.singleSessionInfo.url_imagen}
					link={store.singleSessionInfo.link}
				/>
			</div>
		</div>
	);
};



SingleSessionMeditationHarmoniumDetails.propTypes = {
	match: PropTypes.object,

};
