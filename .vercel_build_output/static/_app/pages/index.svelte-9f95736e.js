import{S as xl,i as _l,s as wl,B as Ot,_ as Al,$ as Pl,a as r,d as l,a0 as yl,f as Be,p as Dl,E as Xe,a1 as bl,H as Vl,e as o,j as fe,k as g,t as v,c as n,m as me,n as x,g as u,b as a,D as e,o as ve,x as B,u as U,v as ue,G as Hl,w as Nl,M as Gt,N as Ml,A as Tl,a2 as Ll,r as Cl}from"../chunks/vendor-4c0561e8.js";import{p as Bl}from"../chunks/stores-6e146982.js";/* empty css                                                    */function Rl(f){let t,i='<path d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42z" fill="currentColor"/>',s=[{width:"1.2em"},{height:"1.2em"},{preserveAspectRatio:"xMidYMid meet"},{viewBox:"0 0 24 24"},f[0]],c={};for(let d=0;d<s.length;d+=1)c=Ot(c,s[d]);return{c(){t=Al("svg"),this.h()},l(d){t=Pl(d,"svg",{width:!0,height:!0,preserveAspectRatio:!0,viewBox:!0});var h=r(t);h.forEach(l),this.h()},h(){yl(t,c)},m(d,h){Be(d,t,h),t.innerHTML=i},p(d,[h]){yl(t,c=Dl(s,[{width:"1.2em"},{height:"1.2em"},{preserveAspectRatio:"xMidYMid meet"},{viewBox:"0 0 24 24"},h&1&&d[0]]))},i:Xe,o:Xe,d(d){d&&l(t)}}}function Ol(f,t,i){return f.$$set=s=>{i(0,t=Ot(Ot({},t),bl(s)))},t=bl(t),[t]}class Re extends xl{constructor(t){super();_l(this,t,Ol,Rl,wl,{})}}function kl(f,t,i){const s=f.slice();return s[7]=t[i],s}function El(f,t,i){const s=f.slice();return s[10]=t[i],s}function zl(f,t,i){const s=f.slice();return s[13]=t[i],s}function $l(f){let t,i,s,c,d,h,_=f[13].title+"",P,$,y,R=f[13].excerpt+"",D,T,ee,k;return c=new Ll({props:{timestamp:f[13].date}}),{c(){t=o("a"),i=o("div"),s=o("div"),fe(c.$$.fragment),d=g(),h=o("h1"),P=v(_),$=g(),y=o("p"),D=v(R),T=g(),this.h()},l(b){t=n(b,"A",{href:!0,class:!0});var z=r(t);i=n(z,"DIV",{class:!0});var A=r(i);s=n(A,"DIV",{class:!0});var I=r(s);me(c.$$.fragment,I),I.forEach(l),d=x(A),h=n(A,"H1",{class:!0});var j=r(h);P=u(j,_),j.forEach(l),$=x(A),y=n(A,"P",{class:!0});var V=r(y);D=u(V,R),V.forEach(l),A.forEach(l),T=x(z),z.forEach(l),this.h()},h(){a(s,"class","z-10 article-date p-0 pb-1 m-0 text-xs md:text-sm lg:pb-2 xl:pb-3 font-base font-fira text-yellow-300/[0.75]"),a(h,"class","font-display font-bold text-sky-100 z-10 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 md:mb-1 lg:mb-2 xl:mb-3 -mt-1"),a(y,"class","font-fira font-light text-sky-200 tracking-wider z-10 text-sm md:text-base xl:text-lg"),a(i,"class","post-card transition duration-300 p-5 lg:p-7 rounded-md bg-gray-900 my-6 hover:bg-sky-800/[0.5] hover:-translate-x-2"),a(t,"href",ee=`/blog/${f[13].slug}`),a(t,"class","no-underline relative")},m(b,z){Be(b,t,z),e(t,i),e(i,s),ve(c,s,null),e(i,d),e(i,h),e(h,P),e(i,$),e(i,y),e(y,D),e(t,T),k=!0},p:Xe,i(b){k||(B(c.$$.fragment,b),k=!0)},o(b){U(c.$$.fragment,b),k=!1},d(b){b&&l(t),ue(c)}}}function Gl(f){let t,i=f[7].tags,s=[];for(let c=0;c<i.length;c+=1)s[c]=Il(El(f,i,c));return{c(){t=o("div");for(let c=0;c<s.length;c+=1)s[c].c();this.h()},l(c){t=n(c,"DIV",{class:!0});var d=r(t);for(let h=0;h<s.length;h+=1)s[h].l(d);d.forEach(l),this.h()},h(){a(t,"class","mb-4 -mt-2 lg:mb-4 lg:-mt-2 md:mb-2 md:mt-2 space-x-2")},m(c,d){Be(c,t,d);for(let h=0;h<s.length;h+=1)s[h].m(t,null)},p(c,d){if(d&4){i=c[7].tags;let h;for(h=0;h<i.length;h+=1){const _=El(c,i,h);s[h]?s[h].p(_,d):(s[h]=Il(_),s[h].c(),s[h].m(t,null))}for(;h<s.length;h+=1)s[h].d(1);s.length=i.length}},d(c){c&&l(t),Gt(s,c)}}}function Il(f){let t,i=f[10]+"",s;return{c(){t=o("span"),s=v(i),this.h()},l(c){t=n(c,"SPAN",{class:!0});var d=r(t);s=u(d,i),d.forEach(l),this.h()},h(){a(t,"class","project-tag font-light font-montserrat -ml-2 whitespace-nowrap px-2 py-1 rounded bg-fuchsia-900/[0.5] text-yellow-300/[0.75]")},m(c,d){Be(c,t,d),e(t,s)},p:Xe,d(c){c&&l(t)}}}function jl(f){let t,i,s,c,d,h,_=f[7].name+"",P,$,y,R=f[7].desc+"",D,T,ee,k=f[7].tags&&Gl(f);return{c(){t=o("a"),i=o("div"),s=o("div"),k&&k.c(),c=g(),d=o("div"),h=o("h1"),P=v(_),$=g(),y=o("p"),D=v(R),T=g(),this.h()},l(b){t=n(b,"A",{href:!0,class:!0});var z=r(t);i=n(z,"DIV",{class:!0});var A=r(i);s=n(A,"DIV",{class:!0});var I=r(s);k&&k.l(I),I.forEach(l),c=x(A),d=n(A,"DIV",{class:!0});var j=r(d);h=n(j,"H1",{class:!0});var V=r(h);P=u(V,_),V.forEach(l),$=x(j),y=n(j,"P",{class:!0});var ge=r(y);D=u(ge,R),ge.forEach(l),j.forEach(l),A.forEach(l),T=x(z),z.forEach(l),this.h()},h(){a(s,"class","text-xs ml-1 flex flex-row project-tags svelte-yowkz0"),a(h,"class","font-display font-bold text-sky-100 z-10 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 md:mb-1 lg:mb-2 xl:mb-3 -mt-1"),a(y,"class","font-fira font-light text-sky-200 tracking-wider mt-2 text-sm md:text-base xl:text-lg "),a(d,"class","project-details flex flex-col  svelte-yowkz0"),a(i,"class","project-card card rounded-md transition-all bg-gray-900 hover:bg-sky-800/[0.5] flex flex-col md:flex-col-reverse md:justify-between lg:flex-col lg:justify-start p-5 lg:p-7 rounded-md hover:-translate-x-2 md:hover:-translate-y-2 md:hover:translate-x-0 svelte-yowkz0"),a(t,"href",ee=`/${f[7].url}`),a(t,"class","project-card-link no-underline flex my-3 md:mx-3 svelte-yowkz0")},m(b,z){Be(b,t,z),e(t,i),e(i,s),k&&k.m(s,null),e(i,c),e(i,d),e(d,h),e(h,P),e(d,$),e(d,y),e(y,D),e(t,T)},p(b,z){b[7].tags&&k.p(b,z)},d(b){b&&l(t),k&&k.d()}}}function Ul(f){let t,i,s,c,d,h,_,P,$,y,R,D,T,ee,k,b,z,A,I,j,V,ge,Ze,W,et,xe,tt,lt,st,Y,_e,at,rt,L,ot,we,nt,it,ye,ct,dt,be,pt,ht,q,ke,ft,mt,C,vt,Ee,ut,gt,ze,xt,_t,wt,F,O,$e,yt,bt,kt,H,te,Et,zt,Ie,le,$t,je,se,It,Se,ae,jt,Ae,G,Pe,St,At,Pt,De,Dt,Vt,Q,J,Ve,Ht,Nt,N,re,Mt,Tt,He,oe,Lt,Ne,ne,Ct,Me,ie,Bt,ce,Ge,Rt,Ut;Vl(f[6]);let de=f[1],w=[];for(let p=0;p<de.length;p+=1)w[p]=$l(zl(f,de,p));const Sl=p=>U(w[p],1,1,()=>{w[p]=null});le=new Re({props:{class:"icon-chevron"}}),se=new Re({props:{class:"icon-chevron"}}),ae=new Re({props:{class:"icon-chevron"}}),oe=new Re({props:{class:"icon-chevron"}}),ne=new Re({props:{class:"icon-chevron"}}),ie=new Re({props:{class:"icon-chevron"}});let Te=f[2],S=[];for(let p=0;p<Te.length;p+=1)S[p]=jl(kl(f,Te,p));return{c(){t=o("main"),i=o("section"),s=o("div"),c=o("h1"),d=v("Hi, I'm Mike."),h=g(),_=o("p"),P=v(`I'm a creative software developer, and this is my professional blog. I love\r
				`),$=o("span"),y=v("user experience"),R=v(` and design that helps realize\r
				human potential. I follow a\r
				`),D=o("span"),T=v("first-principles"),ee=v(`\r
				approach in my life and my work. Here are a few of my\r
				`),k=o("span"),b=v("design principles"),z=v(":"),A=g(),I=o("ol"),j=o("li"),V=o("h2"),ge=v("Never deny the user basic options."),Ze=g(),W=o("p"),et=v("Users should be provided the means to "),xe=o("span"),tt=v("customize the user interface"),lt=v(" as much as possible."),st=g(),Y=o("li"),_e=o("h2"),at=v("Minimize barriers to action."),rt=g(),L=o("p"),ot=v("The app (or website) is "),we=o("span"),nt=v("for something"),it=v(`.\r
						Make it as\r
						`),ye=o("span"),ct=v("intuitive and efficient"),dt=v(`\r
						as possible to `),be=o("span"),pt=v("do that thing."),ht=g(),q=o("li"),ke=o("h2"),ft=v("Leverage visual intelligence."),mt=g(),C=o("p"),vt=v("Augment words and iconography with "),Ee=o("span"),ut=v("color"),gt=v(`\r
						and structure - `),ze=o("span"),xt=v("draw the eye"),_t=v(` to key points\r
						and relationships. Effectively use negative space, layout and structure, diagrams and images\r
						to communicate beyond mere words.`),wt=g(),F=o("div"),O=o("div"),$e=o("h2"),yt=v("Recent posts"),bt=g();for(let p=0;p<w.length;p+=1)w[p].c();kt=g(),H=o("div"),te=o("a"),Et=v("View more articles"),zt=g(),Ie=o("div"),fe(le.$$.fragment),$t=g(),je=o("div"),fe(se.$$.fragment),It=g(),Se=o("div"),fe(ae.$$.fragment),jt=g(),Ae=o("section"),G=o("p"),Pe=o("span"),St=v(`\u201CIf a system is to serve the creative spirit, it must be entirely comprehensible to a\r
				single individual.\u201D`),At=g(),Pt=o("br"),De=o("span"),Dt=v("Daniel H. H. Ingalls"),Vt=g(),Q=o("section"),J=o("div"),Ve=o("h2"),Ht=v("Selected Projects"),Nt=g(),N=o("h2"),re=o("a"),Mt=v("View more projects"),Tt=g(),He=o("div"),fe(oe.$$.fragment),Lt=g(),Ne=o("div"),fe(ne.$$.fragment),Ct=g(),Me=o("div"),fe(ie.$$.fragment),Bt=g(),ce=o("div");for(let p=0;p<S.length;p+=1)S[p].c();this.h()},l(p){t=n(p,"MAIN",{class:!0});var E=r(t);i=n(E,"SECTION",{class:!0});var m=r(i);s=n(m,"DIV",{class:!0});var M=r(s);c=n(M,"H1",{class:!0});var Wt=r(c);d=u(Wt,"Hi, I'm Mike."),Wt.forEach(l),h=x(M),_=n(M,"P",{class:!0});var K=r(_);P=u(K,`I'm a creative software developer, and this is my professional blog. I love\r
				`),$=n(K,"SPAN",{class:!0});var Yt=r($);y=u(Yt,"user experience"),Yt.forEach(l),R=u(K,` and design that helps realize\r
				human potential. I follow a\r
				`),D=n(K,"SPAN",{class:!0});var qt=r(D);T=u(qt,"first-principles"),qt.forEach(l),ee=u(K,`\r
				approach in my life and my work. Here are a few of my\r
				`),k=n(K,"SPAN",{class:!0});var Ft=r(k);b=u(Ft,"design principles"),Ft.forEach(l),z=u(K,":"),K.forEach(l),A=x(M),I=n(M,"OL",{class:!0});var Le=r(I);j=n(Le,"LI",{class:!0});var Ue=r(j);V=n(Ue,"H2",{class:!0});var Qt=r(V);ge=u(Qt,"Never deny the user basic options."),Qt.forEach(l),Ze=x(Ue),W=n(Ue,"P",{class:!0});var We=r(W);et=u(We,"Users should be provided the means to "),xe=n(We,"SPAN",{class:!0});var Jt=r(xe);tt=u(Jt,"customize the user interface"),Jt.forEach(l),lt=u(We," as much as possible."),We.forEach(l),Ue.forEach(l),st=x(Le),Y=n(Le,"LI",{class:!0});var Ye=r(Y);_e=n(Ye,"H2",{class:!0});var Kt=r(_e);at=u(Kt,"Minimize barriers to action."),Kt.forEach(l),rt=x(Ye),L=n(Ye,"P",{class:!0});var pe=r(L);ot=u(pe,"The app (or website) is "),we=n(pe,"SPAN",{class:!0});var Xt=r(we);nt=u(Xt,"for something"),Xt.forEach(l),it=u(pe,`.\r
						Make it as\r
						`),ye=n(pe,"SPAN",{class:!0});var Zt=r(ye);ct=u(Zt,"intuitive and efficient"),Zt.forEach(l),dt=u(pe,`\r
						as possible to `),be=n(pe,"SPAN",{class:!0});var el=r(be);pt=u(el,"do that thing."),el.forEach(l),pe.forEach(l),Ye.forEach(l),ht=x(Le),q=n(Le,"LI",{class:!0});var qe=r(q);ke=n(qe,"H2",{class:!0});var tl=r(ke);ft=u(tl,"Leverage visual intelligence."),tl.forEach(l),mt=x(qe),C=n(qe,"P",{class:!0});var Ce=r(C);vt=u(Ce,"Augment words and iconography with "),Ee=n(Ce,"SPAN",{class:!0});var ll=r(Ee);ut=u(ll,"color"),ll.forEach(l),gt=u(Ce,`\r
						and structure - `),ze=n(Ce,"SPAN",{class:!0});var sl=r(ze);xt=u(sl,"draw the eye"),sl.forEach(l),_t=u(Ce,` to key points\r
						and relationships. Effectively use negative space, layout and structure, diagrams and images\r
						to communicate beyond mere words.`),Ce.forEach(l),qe.forEach(l),Le.forEach(l),M.forEach(l),wt=x(m),F=n(m,"DIV",{class:!0});var Fe=r(F);O=n(Fe,"DIV",{class:!0});var Qe=r(O);$e=n(Qe,"H2",{class:!0});var al=r($e);yt=u(al,"Recent posts"),al.forEach(l),bt=x(Qe);for(let he=0;he<w.length;he+=1)w[he].l(Qe);Qe.forEach(l),kt=x(Fe),H=n(Fe,"DIV",{class:!0});var X=r(H);te=n(X,"A",{href:!0,class:!0});var rl=r(te);Et=u(rl,"View more articles"),rl.forEach(l),zt=x(X),Ie=n(X,"DIV",{class:!0});var ol=r(Ie);me(le.$$.fragment,ol),ol.forEach(l),$t=x(X),je=n(X,"DIV",{class:!0});var nl=r(je);me(se.$$.fragment,nl),nl.forEach(l),It=x(X),Se=n(X,"DIV",{class:!0});var il=r(Se);me(ae.$$.fragment,il),il.forEach(l),X.forEach(l),Fe.forEach(l),m.forEach(l),jt=x(E),Ae=n(E,"SECTION",{class:!0});var cl=r(Ae);G=n(cl,"P",{class:!0});var Oe=r(G);Pe=n(Oe,"SPAN",{class:!0});var dl=r(Pe);St=u(dl,`\u201CIf a system is to serve the creative spirit, it must be entirely comprehensible to a\r
				single individual.\u201D`),dl.forEach(l),At=x(Oe),Pt=n(Oe,"BR",{}),De=n(Oe,"SPAN",{class:!0});var pl=r(De);Dt=u(pl,"Daniel H. H. Ingalls"),pl.forEach(l),Oe.forEach(l),cl.forEach(l),Vt=x(E),Q=n(E,"SECTION",{class:!0});var Je=r(Q);J=n(Je,"DIV",{class:!0});var Ke=r(J);Ve=n(Ke,"H2",{class:!0});var hl=r(Ve);Ht=u(hl,"Selected Projects"),hl.forEach(l),Nt=x(Ke),N=n(Ke,"H2",{class:!0});var Z=r(N);re=n(Z,"A",{href:!0,class:!0});var fl=r(re);Mt=u(fl,"View more projects"),fl.forEach(l),Tt=x(Z),He=n(Z,"DIV",{class:!0});var ml=r(He);me(oe.$$.fragment,ml),ml.forEach(l),Lt=x(Z),Ne=n(Z,"DIV",{class:!0});var vl=r(Ne);me(ne.$$.fragment,vl),vl.forEach(l),Ct=x(Z),Me=n(Z,"DIV",{class:!0});var ul=r(Me);me(ie.$$.fragment,ul),ul.forEach(l),Z.forEach(l),Ke.forEach(l),Bt=x(Je),ce=n(Je,"DIV",{class:!0});var gl=r(ce);for(let he=0;he<S.length;he+=1)S[he].l(gl);gl.forEach(l),Je.forEach(l),E.forEach(l),this.h()},h(){a(c,"class","text-3xl lg:text-5xl font-bold font-display"),a($,"class","font-bold italic color-1 svelte-yowkz0"),a(D,"class","font-bold italic color-2 svelte-yowkz0"),a(k,"class","color-3 font-bold italic svelte-yowkz0"),a(_,"class","intro-body mt-3 font-light text-xl xl:text-2xl leading-relaxed font-montserrat svelte-yowkz0"),a(V,"class","li-heading color-3 leading-none md:text-2xl xl:text-3xl svelte-yowkz0"),a(xe,"class","italic color-1 font-medium svelte-yowkz0"),a(W,"class","li-snippet text-base lg:text-lg svelte-yowkz0"),a(j,"class","mt-4 svelte-yowkz0"),a(_e,"class","li-heading color-3 leading-none md:text-2xl xl:text-3xl svelte-yowkz0"),a(we,"class","italic color-2 font-medium svelte-yowkz0"),a(ye,"class","italic color-1 font-medium svelte-yowkz0"),a(be,"class","italic color-2 font-medium svelte-yowkz0"),a(L,"class","li-snippet text-base lg:text-lg svelte-yowkz0"),a(Y,"class","mt-4 svelte-yowkz0"),a(ke,"class","li-heading color-3 leading-none md:text-2xl xl:text-3xl svelte-yowkz0"),a(Ee,"class","italic color-1 font-medium svelte-yowkz0"),a(ze,"class","italic color-2 font-medium svelte-yowkz0"),a(C,"class","li-snippet text-base lg:text-lg svelte-yowkz0"),a(q,"class","mt-4 svelte-yowkz0"),a(I,"class","pl-7 mt-6 svelte-yowkz0"),a(s,"class","intro flex flex-col text-lg md:pr-12 lg:pr-18 xl:pr-24 xl:text-xl svelte-yowkz0"),a($e,"class","recent-label uppercase font-montserrat -mt-2 -mb-4 text-sky-300 text-md lg:text-lg"),a(O,"class","post w-full"),a(te,"href","/blog"),a(te,"class","view-more pr-4 pb-2 offset-4 no-underline text-sky-300 hover:text-sky-100 hover:decoration-2 transition svelte-yowkz0"),a(Ie,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(je,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(Se,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(H,"class","view-more text-base xl:text-lg text-right pr-4 relative flex flex-row justify-end mb-4 svelte-yowkz0"),a(F,"class","posts-panel flex flex-col self-center mt-9 mx-0 w-full md:mt-0 svelte-yowkz0"),a(i,"class","articles md:grid md:articles-change w-full px-4 md:px-6 lg:px-0 self-center p-3"),a(Pe,"class","font-medium"),a(De,"class","font-bold text-lg author uppercase  svelte-yowkz0"),a(G,"class","statement text-3xl leading-relaxed font-bold italic text-center p-6 border-2 -mx-3 my-12 lg:m-0 lg:border-none border-amber-500 rounded-lg w-auto xl:w-4/5 xl:px-16 xl:leading-loose lg:text-4xl 2xl:w-3/4 2xl:text-4xl self-center py-12  svelte-yowkz0"),a(Ae,"class","flex flex-col w-full self-center text-center items-center justify-center px-8 lg:px-0"),a(Ve,"class","recent-label font-montserrat uppercase text-md lg:text-lg text-amber-400/[0.75] mt-9 -mb-1 md:mb-0 xl:mb-2"),a(re,"href","/creative"),a(re,"class","view-more offset-4 pr-4 pb-2 no-underline  svelte-yowkz0"),a(He,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(Ne,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(Me,"class","icon-wrapper -top-[1px] xl:top-[1px] svelte-yowkz0"),a(N,"class","view-more text-right text-base xl:text-lg pr-4 -mb-3 xl:-mb-0 md:-mb-2 relative flex flex-row justify-end transition text-amber-400/[0.75] hover:text-white svelte-yowkz0"),a(J,"class","flex flex-row items-end justify-between"),a(ce,"class","projects-group md:grid w-full flex flex-col mb-12 svelte-yowkz0"),a(Q,"class","projects flex flex-col w-full justify-center px-4 md:px-6 lg:px-0 svelte-yowkz0"),a(t,"class","homepage bg-black flex flex-col self-center justify-items-center items-center w-full lg:text-sm lg:px-12 xl:px-24 2xl:w-4/5 2xl:px-12 3xl:w-3/4 3xl:px-36 mt-20")},m(p,E){Be(p,t,E),e(t,i),e(i,s),e(s,c),e(c,d),e(s,h),e(s,_),e(_,P),e(_,$),e($,y),e(_,R),e(_,D),e(D,T),e(_,ee),e(_,k),e(k,b),e(_,z),e(s,A),e(s,I),e(I,j),e(j,V),e(V,ge),e(j,Ze),e(j,W),e(W,et),e(W,xe),e(xe,tt),e(W,lt),e(I,st),e(I,Y),e(Y,_e),e(_e,at),e(Y,rt),e(Y,L),e(L,ot),e(L,we),e(we,nt),e(L,it),e(L,ye),e(ye,ct),e(L,dt),e(L,be),e(be,pt),e(I,ht),e(I,q),e(q,ke),e(ke,ft),e(q,mt),e(q,C),e(C,vt),e(C,Ee),e(Ee,ut),e(C,gt),e(C,ze),e(ze,xt),e(C,_t),e(i,wt),e(i,F),e(F,O),e(O,$e),e($e,yt),e(O,bt);for(let m=0;m<w.length;m+=1)w[m].m(O,null);e(F,kt),e(F,H),e(H,te),e(te,Et),e(H,zt),e(H,Ie),ve(le,Ie,null),e(H,$t),e(H,je),ve(se,je,null),e(H,It),e(H,Se),ve(ae,Se,null),e(t,jt),e(t,Ae),e(Ae,G),e(G,Pe),e(Pe,St),e(G,At),e(G,Pt),e(G,De),e(De,Dt),e(t,Vt),e(t,Q),e(Q,J),e(J,Ve),e(Ve,Ht),e(J,Nt),e(J,N),e(N,re),e(re,Mt),e(N,Tt),e(N,He),ve(oe,He,null),e(N,Lt),e(N,Ne),ve(ne,Ne,null),e(N,Ct),e(N,Me),ve(ie,Me,null),e(Q,Bt),e(Q,ce);for(let m=0;m<S.length;m+=1)S[m].m(ce,null);Ge=!0,Rt||(Ut=Hl(window,"resize",f[6]),Rt=!0)},p(p,[E]){if(E&2){de=p[1];let m;for(m=0;m<de.length;m+=1){const M=zl(p,de,m);w[m]?(w[m].p(M,E),B(w[m],1)):(w[m]=$l(M),w[m].c(),B(w[m],1),w[m].m(O,null))}for(Cl(),m=de.length;m<w.length;m+=1)Sl(m);Nl()}if(E&4){Te=p[2];let m;for(m=0;m<Te.length;m+=1){const M=kl(p,Te,m);S[m]?S[m].p(M,E):(S[m]=jl(M),S[m].c(),S[m].m(ce,null))}for(;m<S.length;m+=1)S[m].d(1);S.length=Te.length}},i(p){if(!Ge){for(let E=0;E<de.length;E+=1)B(w[E]);B(le.$$.fragment,p),B(se.$$.fragment,p),B(ae.$$.fragment,p),B(oe.$$.fragment,p),B(ne.$$.fragment,p),B(ie.$$.fragment,p),Ge=!0}},o(p){w=w.filter(Boolean);for(let E=0;E<w.length;E+=1)U(w[E]);U(le.$$.fragment,p),U(se.$$.fragment,p),U(ae.$$.fragment,p),U(oe.$$.fragment,p),U(ne.$$.fragment,p),U(ie.$$.fragment,p),Ge=!1},d(p){p&&l(t),Gt(w,p),ue(le),ue(se),ue(ae),ue(oe),ue(ne),ue(ie),Gt(S,p),Rt=!1,Ut()}}}const Ql=async({fetch:f})=>{const t=await f("../blog.json");if(t.ok){const{posts:i}=await t.json();return{props:{posts:i}}}};function Wl(f,t,i){let s,c;Ml(f,Bl,y=>i(5,c=y)),Tl(()=>{});let{posts:d}=t,h=d==null?void 0:d.slice(0,3);console.log("\u{1F680} ~ file: index.svelte ~ line 4 ~ posts",d);let _=[{name:"MetaBrain.io",url:"./creative/sketch01",tags:["knowledge management app","GraphQL/DB","LMS"],desc:"A knowledge tracking platform for life. Research, track, organize, curate, plan, analyze, schedule, do. One app to rule them all.",component:!1},{name:"Super Tic-Tac-Toe",url:"./creative/sketch02",tags:["Svelte/Sapper","game","(S)CSS"],desc:"Inspired by pen-and-paper with my daughter. Tic-Tac-Toe on steroids. Choose an emoji, configure your gameboard and rules, and have at it with up to 8 players.",component:!1},{name:"Creative Coding",url:"./creative/sketch03",tags:["creative coding","generative art","javascript"],desc:"Fulfilling a lifelong passion for beauty, and exploring the relationships between form, movement and number."}],P;function $(){i(0,P=window.innerWidth)}return f.$$set=y=>{"posts"in y&&i(3,d=y.posts)},f.$$.update=()=>{f.$$.dirty&32&&i(4,s=c.path),f.$$.dirty&16&&console.log("\u{1F680} ~ file: index.svelte ~ line 24 ~ path",s)},[P,h,_,d,s,c,$]}class Jl extends xl{constructor(t){super();_l(this,t,Wl,Ul,wl,{posts:3})}}export{Jl as default,Ql as load};
