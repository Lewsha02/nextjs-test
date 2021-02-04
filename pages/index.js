import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
	title: {
		color: "red",
	},
}));

export default function Page({ id, options, count, color, data }) {
	return (
		<MyWonderfulComponent
			id={id}
			options={options}
			count={count}
			color={color}
			data={data}
		>
			I'm text from a component
		</MyWonderfulComponent>
	);
}

function MyWonderfulComponent({ id, options, children, ...other }) {
	const { count } = other;
	const classes = useStyles();
	const [summ, setSumm] = useState(count);

	useEffect(() => {
		if (
			id &&
			options &&
			options.params &&
			options.params.fields &&
			options.params.fields.isDynamic
		) {
			setSumm((prev) => ++prev);
		}
	}, []);

	console.log(summ);

	return (
		<>
			<h1 className={classes.title}>Hello World!</h1>
			<Grid>
				<Grid item xs={12}>
					{children} <br/>
					{other.data}
				</Grid>
			</Grid>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {
			id: 1,
			options: {
				params: {
					fields: {
						isDynamic: true,
					},
				},
			},
			count: 0,
			color: "#fff",
			data: "Hello from SSR",
		},
	};
}
