import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
/*
dark: '#000007',
    darkestNavy: '#01050b',
    darkNavy: '#020c1b',
    navy: '#0a192f',
    lightNavy: '#172a45',
    darkGrey: '#333f58',
    mediumGrey: '#2d3952',
    grey: '#4c5772',
    lightGrey: '#606a86',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#ccd6f6',
    offWhite: '#dce7ff',
    white: '#e6f1ff',
    pink: '#FF647F',
    yellow: '#FFC464',
    orange: '#FF9E64',
    green: 'rgba(78, 205, 196, 1)',
    blue: '#71AFFF',
	darkBlue: '#1D7FFC',
	*/
const theme = createMuiTheme({

	palette: {
		/* background: '#0a192f', */
		primary: {
			light: '#FFC464',
			main: '#0a192f',			
			dark: '#333f58',
			contrastText: '#e6f1ff'
		},
		secondary : {
			light: '#4ecdc4',
			main: '#FF9E64',			
			dark: '#2d3952',
			contrastText: '#4ecdc4'
		}
  }
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={home} />
						<Route exact path="/login" component={login} />
						<Route exact path="/signup" component={signup} />
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;