import { LitElement, html, css } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../../store.js'
import { stateAwait } from '../../stateAwait.js'

import '@material/mwc-button'
import '@material/mwc-icon'
import '@material/mwc-fab'
import '@polymer/iron-pages'
import '@polymer/paper-icon-button/paper-icon-button.js'
import './welcome-page.js'
import './create-account-section.js'
import './login-section.js'

import settings from '../../functional-components/settings-page.js'

window.reduxStore = store

const animationDuration = 0.7 // Seconds

class LoginView extends connect(store)(LitElement) {
    static get properties() {
        return {
            loggedIn: { type: Boolean },
            selectedPage: { type: String },
            pages: { type: Object },
            rippleIsOpen: { type: Boolean },
            config: { type: Object },
            rippleLoadingMessage: { type: String },
            selectedPageElement: {}
        }
    }

    static get styles() {
        return [
            css`
                
            `
        ]
    }

    getPreSelectedPage() {

        return 'welcome'
    }

    constructor() {
        super()
        this.selectedPage = this.getPreSelectedPage()
        this.selectedPageElement = {}
        this.rippleIsOpen = false
        this.pages = {
            welcome: 0,
            'create-account': 1,
            login: 2
        }
        this.rippleLoadingMessage = 'Getting information'
    }

    firstUpdated() {

        stateAwait(state => {
            return 'primary' in state.config.styles.theme.colors
        }).catch(e => console.error(e))

        const loginContainerPages = this.shadowRoot.querySelector('#loginContainerPages')
        const loginCard = this.shadowRoot.querySelector('#login-card')
        const navigate = e => {
            this.selectPage(e.detail.page)
        }
        const updatedProperty = e => {
            // ...
            const selectedPageElement = this.selectedPageElement
            this.selectedPageElement = {}
            setTimeout(() => { this.selectedPageElement = selectedPageElement }, 1) // Yuck
        }
        loginContainerPages.addEventListener('selected-item-changed', () => {

            if (!loginContainerPages.selectedItem) {

                if (this.selectedPageElement.removeEventListener) {
                    this.selectedPageElement.removeEventListener('navigate', navigate)
                    this.selectedPageElement.removeEventListener('updatedProperty', updatedProperty)
                }
                this.selectedPageElement = {}
                loginCard.classList.remove('animated')
                loginCard.className += ' animated'
            } else {
                setTimeout(() => {

                    this.selectedPageElement = loginContainerPages.selectedItem

                    this.selectedPageElement.addEventListener('navigate', navigate)
                    this.selectedPageElement.addEventListener('updatedProperty', updatedProperty)
                    setTimeout(() => loginCard.classList.remove('animated'), animationDuration * 1000)
                }, 1)
            }
        })
    }

    render() {
        return html`
            <style>
                canvas {
                    display: block;
                    vertical-align: bottom;
                }
            
                .login-page {
                    background: url("/img/qortal_background_light_.jpg");
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-position: center;
                    height: var(--window-height);
                    width:100vw;
                    max-width:100vw;
                    max-height:var(--window-height);
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:1;
                }
                .login-card-container {
                    max-width:1240px;
                    max-height:var(--window-height);
                    margin-right: auto;
                    margin-left: auto;

                    width: calc(100vw);
                }

                .qortal-logo {
		    margin-left: auto;
		    margin-right: auto;
                    width:200px;
                    max-width:40%;
                    z-index:1;
                }
                .login-card-center-container {
                    max-width:100%;
                    max-height:var(--window-height);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: var(--window-height);
                    overflow:hidden;
                }
                #loginContainerPages {
                    display:inline;
                }
                #loginContainerPages [page] {
                    background: none;
                    padding:0;
                }
                .login-card {
                    min-width: 340px;
                    border-bottom: 2px solid var(--mdc-theme-primary);
                    border-top: 2px solid var(--mdc-theme-primary);
                    text-align:center;
                    z-index:0;
                    padding:0;
                    border: 0;
                    border-radius: 4px;
                }
                .login-card p {
                    margin-top: 0;
                    font-size: 1rem;
                    font-style: italic;
                }
                .login-card h1{
                    margin-bottom:12px;
                    font-size:64px;
                }
                .login-card iron-pages {
                    height:100%;
                }
                .backButton {
                    padding-top:18px;
                    text-align:center;
                }
                #login-pages-nav {
                    text-align: left;
                    /* padding-bottom:8px; */
                    padding: 12px 0 8px 0;
                }
                #nav-next {
                    float: right;
                }
                @media only screen and (min-width: ${getComputedStyle(document.body).getPropertyValue('--layout-breakpoint-tablet')}) {
                    /* Desktop/tablet */
                    .login-card {
                        max-width:460px;
                    }
                    #loginContainerPages [page] {
                        border-radius: 4px;
                    }
                    #loginContainerPages [page="welcome"] {

                    }
                }
                @media only screen and (max-width: ${getComputedStyle(document.body).getPropertyValue('--layout-breakpoint-tablet')}) {
                    /* Mobile */
                    .qortal-logo {
                        display:none;
                        visibility:hidden;
                    }
                    .login-card{
                        width:100%;
                        margin:0;
                        top:0;
                        max-width:100%;
                    }
                    .backButton {
                        text-align: left;
                        padding-left:12px;
                    }
                }

                @keyframes fade {
                    from {
                        opacity: 0;
                        transform: translateX(-20%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes grow-up {
                    from {
                        overflow:hidden;
                        max-height:0;
                    }
                    to {
                        overflow:hidden;
                        max-height:var(--window-height);
                    }
                }
                iron-pages .animated, .animated {
                    animation-duration: ${animationDuration}s;
                    animation-name: grow-up;
                }
                div[page] > paper-icon-button {
                    margin:12px;
                }
                .corner-box {
                    border-color: var(--mdc-theme-primary) !important;
                }
                [hidden] {
                    visibility: hidden;
                    display: none;
                }
            </style>

            <div class="login-page" ?hidden=${this.loggedIn}>
                <mwc-fab icon="settings" style="position:fixed; right:24px; bottom:24px;" @click=${() => settings.show()}></mwc-fab>
                <div class="login-card-container">
                    <div class="login-card-center-container">
                        <div class="login-card" id="login-card">
                        <img class="qortal-logo" src="${this.config.coin.logo}">
                            <iron-pages selected="${this.selectedPage}" attr-for-selected="page" id="loginContainerPages">
                                <welcome-page @next=${e => this.selectedPageElement.next(e)} page="welcome"></welcome-page>
                                <create-account-section @next=${e => this.selectedPageElement.next(e)} page="create-account"></create-account-section>
                                <login-section @next=${e => this.selectedPageElement.next(e)} page="login"></login-section>
                            </iron-pages>
                            <div id="login-pages-nav" ?hidden="${this.selectedPageElement.hideNav}">
                                <mwc-button @click=${e => this.selectedPageElement.back(e)} id="nav-back" ?hidden="${this.selectedPageElement.backHidden}" ?disabled="${this.selectedPageElement.backDisabled}">
                                    <mwc-icon>keyboard_arrow_left</mwc-icon>${this.selectedPageElement.backText}
                                </mwc-button>
                                <mwc-button @click=${e => this.selectedPageElement.next(e)} id="nav-next" ?hidden="${this.selectedPageElement.nextHidden}" ?disabled="${this.selectedPageElement.nextDisabled}">
                                    ${this.selectedPageElement.nextText}<mwc-icon>keyboard_arrow_right</mwc-icon>
                                </mwc-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    selectPage(newPage) {
        this.selectedPage = newPage
    }

    stateChanged(state) {
        if (this.loggedIn && !state.app.loggedIn) this.cleanup()
        this.loggedIn = state.app.loggedIn
        this.config = state.config
    }

    cleanup() {
        this.selectedPage = 'welcome'
    }
}

window.customElements.define('login-view', LoginView)
