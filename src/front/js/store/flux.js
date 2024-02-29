import { useState } from "react";
import { element } from "prop-types";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			jivamuktiYoga: [],
			jivamuktiSessionInfo: {},
			singleYogaSessionInfo: {},
			singleMeditationOrHarmoniumSessionInfo: {},

			// rocketSessionInfo: {},
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello") // Aqui se esta usando la variable de entorno
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				// console.log(email, password);
				// console.log("funciona")
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						// mode: 'cors',
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()
					if (response.status === 401) {
						return false;
					}
					localStorage.setItem("token", data.access_token)
					// console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			getAllSessionsYogaType: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/yogatype");
					// console.log(response.status);
					if (response.status === 200) {
						const data = await response.json();
						// console.log(data);
						setStore({ jivamuktiYoga: data.jivamukti_sessions });
						return true;
					} else {
						throw new Error("Error fetching Jivamukti yoga data");
					}
				} catch (error) {
					console.error(error);
					return false;
				}
			},

			getOneYogatypeSession: async (yogatype, yogatype_Id) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + `/api/${yogatype}/${yogatype_Id}`, {
						method: "GET",
					});
					console.log(response.status);

					if (response.status === 200) {
						let data = await response.json();
						// console.log(data);
						const oneYogaSessionInfoWithId = {
							...data,
							sessionId: yogatype_Id,
						};
						console.log("Updated session info:", oneYogaSessionInfoWithId);
						if (yogatype == 'jivamuktiyoga') {
							setStore({ singleYogaSessionInfo: data.jivamukti_session })
						}
						else if (yogatype == 'vinyasayoga') {
							setStore({ singleYogaSessionInfo: data.vinyasa_session })
						}
						else if (yogatype == 'rocketyoga') {
							setStore({ singleYogaSessionInfo: data.rocket_session })
						}
						else if (yogatype == 'ashtangayoga') {
							setStore({ singleYogaSessionInfo: data.rocket_session })
						}
						else if (yogatype == 'hathayoga') {
							setStore({ singleYogaSessionInfo: data.rocket_session })
						}
						return true
					} else {
						throw new Error("Error fetching session yoga info");
					}
				} catch (err) {
					console.error(err);
					return false
				}
			},

			// getAllMeditationOrHarmoniumSessions: async () => {
            //     try {
            //         const response = await fetch(process.env.BACKEND_URL + "/api/other");
            //         console.log(response.status);
            //         if (response.status === 200) {
            //             const data = await response.json();
            //             console.log(data);
            //             setStore({ jivamuktiYoga: data.jivamukti_sessions });
            //             return true;
            //         } else {
            //             throw new Error("Error fetching Jivamukti yoga data");
            //         }
            //     } catch (error) {
            //         console.error(error);
            //         return false;
            //     }
            // },
			getAllMeditation: async () => 	{
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/${othersessiontype}");
					console.log(response.status);
			
					if (response.status === 200) {
						const data = await response.json();
						console.log(data);
						setStore({ meditation: data.meditation_sessions });
						return true;
					} else {
						throw new Error("Error fetching Hatha yoga data");
					}
				} catch (error) {
					console.error(error);
					return false;
				}

			},

			getOneMeditationOrHamorniumType: async (othersessiontype, othersessiontype_Id) => {
				try {
					console.log("hola")
					console.log("othersessiontype:", othersessiontype);
					console.log("othersessiontype_Id:", othersessiontype_Id);
					// let response = await fetch(process.env.BACKEND_URL + `/api/${othersessiontype}/${othersessiontype_Id}`, {
					// 	method: "GET",
					// });
					// console.log(response.status);

					if (response.status === 200) {
						let data = await response.json();
						console.log(data);
						const oneSessionInfoWithId = {
							...data,
							sessionId: othersessiontype_Id,
						};
						console.log("Updated session info:", oneSessionInfoWithId);
						if (othersessiontype == 'meditation') {
							setStore({ singleMeditationOrHarmoniumSessionInfo: data.meditation_session })
						} else {
							setStore({ singleMeditationOrHarmoniumSessionInfo: data.harmonium_session })
						}
					} else {
						throw new Error("Error fetching session harmonium/meditation info");
					}
				} catch (err) {
					console.error(err);
					return false
				}
			},




		}
	};
};

export default getState;
