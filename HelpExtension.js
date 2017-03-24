/**
 * @author : gherardo varando (gherardo.varando@gmail.com)
 *
 * @license: GPL v3
 *     This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


 */

"use strict";
const {
    Sidebar,
    GuiExtension,
    util,
    ToggleElement,
    gui
} = require('electrongui');
const fs = require('fs');
const marked = require('marked');
const renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
    if (!text) text = href;
    if (!title) title = href;
    if (href.includes("@")) {
        return (href);
        return (`<a href="mailto:${href}" title="${title}" target="_parent"> ${text} </a>`);
    }
    if (href.includes('http') | href.includes('www')) {
        return (`<a href="#" title="${title}" onclick="gui.extensionsManager.extensions.helpPage.loadurl('${href}');"> ${text} </a>`);
    }
    return (`<a href="#" role="button" title="${title}" onclick="gui.extensionsManager.extensions.helpPage.displayPage('${href}');"> ${text} </a>`);

}

renderer.image = function(href, title, text) {
    return (`<img src="${gui.extensionsManager.extensions.helpPage.getPagesDir()}/${href}" alt="${text}" title="${title}"></img>`)
}

marked.setOptions({
    renderer: renderer
});

class HelpExtension extends GuiExtension {

    constructor() {
        super({
         icon:'fa fa-question'
        });

    }


    activate() {

        //add the sidebar
        this.sidebar = new Sidebar(this.element);
        this.sidebar.addNav();
        this.sidebar.nav.addTitle('Help pages');
        this.sidebar.show();


        //add the help pages container
        let page = document.createElement('DIV');
        page.className = 'pane padded markdown-body';
        this.page = new ToggleElement(page);
        this.page.hide();

        //add the webview
        let webview = document.createElement('WEBVIEW');
        webview.autosize = 'on';
        webview.style.width = '100%';
        webview.className = 'padded';
        this.webview = new ToggleElement(webview);
        this.webview.hide();

        //append the page contaitner and the webview
        this.element.appendChild(page);
        this.element.appendChild(webview);



        this.pages = util.readJSONsync(`${__dirname}/_help/pages.json`, (err) => {
            console.log(err);
        }).pages;
        this.pagesId = this.pages.map((pag) => {
            return (pag.id)
        });

        this.pages.map((pag) => {
            this.addPage(pag);
        });

        this.addToggleButton({
            buttonsContainer: gui.header.actionsContainer,
            icon: "fa fa-question",
            groupId: "basetools"
        });


        this.sidebar.nav.addTitle('Github');

        this.sidebar.addItem({
            title: 'Source code',
            icon: 'icon icon-github-circled',
            onclick: () => {
                this.loadurl('https://github.com/ComputationalIntelligenceGroup/Atlas');
            }
        });


        this.sidebar.addItem({
            title: 'Submit issue',
            icon: 'icon icon-github',
            onclick: () => {
                this.loadurl('https://github.com/ComputationalIntelligenceGroup/Atlas/issues/new');
            }
        });

        //display the first page
        this.displayPage(this.pages[0]);
        super.activate();
    }

    deactivate() { /// the extension has to take care of removing all the buttons and element appended
        this.sidebar.remove();
        this.element.removeChild(this.page.element);
        this.element.removeChild(this.webview.element);
        this.removeToggleButton(); //this is compulsory to leave the interface clean
        super.deactivate();
    }

    getPagesDir() {
        return `${__dirname}/_help/Atlas.wiki/`;
    }


    readMarkdown(filename, callback, errorCl, callfirst) {
        fs.readFile(filename, 'utf-8', function(err, data) {
            if (err) {
                if (typeof errorCl === 'function') {
                    errorCl(err);
                }
                return;
            }
            if (typeof callfirst === 'function') {
                data = callfirst(data);
            }
            var obj = marked(data);
            if (typeof callback === 'function') {
                callback(obj);
            }
        });
    }

    addPage(page) {
        let options = {};
        options.icon = page.icon;
        options.id = page.id;
        options.title = page.title;
        if (page.id) {
            options.onclick = () => {
                this.displayPage(page);
                this.sidebar.nav.applyAll((it) => {
                    it.className = 'nav-group-item';
                });
                this.sidebar.nav.items[page.id].className = 'nav-group-item active';
            };
            this.sidebar.nav.addItem(options);
        } else {
            this.sidebar.nav.addTitle(options.title);
        }

    }

    displayPage(pg) {
        let indx;
        if (typeof pg === 'string') {
            indx = this.pagesId.indexOf(pg);
            if (indx >= 0) {
                pg = this.pages[indx];
            }
        }
        let id = pg.id;
        this.sidebar.nav.applyAll((it) => {
            it.className = 'nav-group-item';
        });
        this.sidebar.nav.items[id].className = 'nav-group-item active'
        this.webview.hide();
        this.readMarkdown(`${this.getPagesDir()}${pg.file}`, (md) => {
            this.page.element.innerHTML = md;
        }, null, (data) => {
            return (data.replace(/\[\[/g, '![](').replace(/\]\]/g, ')')); // here we translate from github markdown expression for image [[ ]] to the usual md image syntax !()[ ]
        });
        this.page.show();
    }

    loadurl(href) {
        this.webview.show();
        this.page.hide();
        this.webview.element.src = href;
    }



}

module.exports = HelpExtension;
