import {describe, expect, it} from 'vitest';
import {  render, screen } from "@testing-library/react"
import App from "../src/App"

describe('test the flow of application', () => {
    it('should check the presence of use current location button', async () => {
        render(<App />)
        const Locationbutton = screen.getByRole('button', { name: /use current location/i });
        expect(Locationbutton).toBeInTheDocument();
    });
    it('should check that add to fav button is not present', async () => {
        render(<App />)
        const favButton = screen.queryByText('button', {  name: /add to fav list\?/i});
        expect(favButton).not.toBeInTheDocument;
    });
    it('should press the use current location button', async () => {
        user.setup();
        render(<App />)
        const Locationbutton = screen.getByRole('button', { name: /use current location/i });
        await user.click(Locationbutton);
        const currentWeather = screen.getByText(/current weather conditions/i);
        expect(currentWeather).toBeInTheDocument();
        const forecast = screen.getByText(/5 day forecast/i);
        expect(forecast).toBeInTheDocument();
    });
})