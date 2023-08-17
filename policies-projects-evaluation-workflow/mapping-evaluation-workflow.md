# Mapping evaluation workflow

The flowchart below focuses on the _evaluation_ part of our process.

```mermaid
graph TD
  S["Author (A) submits work (W)"] -->|informal or Airtable/PubPub| MP[M and FS prioritize work]
  NBER[Work enters 'prestige' archive ] --> MP 
  MP --> IA
MP --> WE[Work to evaluate]
  WE ..-  |M/FS may add| BEN["'Bespoke Evaluation Notes' (BEN)"]


MS["Managers (M) and field specialists (FS) <br/> select & prioritize work, contact authors"] --> 
AP[Author: OK]
AP --> WE
  MS --> AN[Author: NO] --> DE[Don't evaluate]
  MS --> ER[A: Embargo please ]
  ER ..- SD[See discussion]
  WE -->|Managers select| EM(("Evaluation <br/> Manager (EM)"))
  EM .-> |EM may add tips to| BEN 

IA[Inform A's, <br/>asks engagement q's]
  IA .-> AE[A's may engage <br/> feedback of interest <br/> link updated version] 

EM -->|EM selects & <br/> contacts| UJEV(UJ evaluators) 
UJEV --> |Accepts eval. assignment| EA((EV = Evaluator who <br/> accepts))
BEN ..-|incorporated into| UJT[Template, <br/> guidelines for EV]
AE ..-|may feed into| UJT 
EA --> |EM schedules with EV| EVC[All EV's <br/> complete evals] --> EC[\Eval. content\]
EVC --> EVR[\Eval. ratings\] 
UJT --> |EM shares with| EA 


EC -->|EM| EVPA[Passed <br/> anonymously <br/> to A]
EVR --> |EM| EVPA[Passed <br/> anonymously <br/> to A]
EVPA .-> ARE[\Authors' response\]
EVPA .-> TW[2 weeks <br/> w/o response]
EVPA .-> TB[A: 'too busy <br/> to respond']

TW ..-|skip to| EMS
TB ..-|skip to| EMS

EVC .->|EV chooses|EVA[Anonymity]
EVC .->|EV chooses|EVS[to sign eval.]

ARE .->|EM considers in| EMS[\EM's summary\] 
EVC ..- |EM considers in| EMS

EMS --> UJO[/Unjournal <br/> published output w/ DOIs/] 
EC --> UJO
ARE --> UJO 
EVR --> |Prominently <br/> reported in| UJO
EVS .-> |EV name| UJO

EVR .->|After UJ output|UJRD[/Ratings/predictions <br/> database <br/>/]

UJO -->|EM|UJOI[Inform authors and Evaluators]
UJO --> UJPUB[Publicize, follow availability, <br/> bibliometrics.] 

```

## Describing key steps above (updated 1 August '23)

1. Submission/selection (multiple routes)
   1. Author (A) submits work (W), creates new submission (submits a URL and DOI), through our platform or informally
      * Author (or someone on their behalf) can complete a _submission form;_ this includes a potential 'request for embargo' or other special treatment
   2. Managers and field specialists select work (or the project is submitted independently of authors) and the management team agrees to prioritize it
      * For either of these cases (1 or 2), authors are asked for _permission_
   3. Alternate [_Direct Evaluation track_](considering-projects/direct-evaluation-track.md)_:_ 'Work enters prestige archive' (NBER, CEPR, and some other cases).
      * Managers inform and consult the authorsbut permission [is not needed](#user-content-fn-1)[^1]. (Particularly relevant: ask author if we have the latest updated version of the research.)
2. Prioritization
   * _Following author submission_ ...
     * Manager(s) (M) and Field Specialists (FS) prioritize work for review (see [Project selection and evaluation](considering-projects/)),
   * _Following direct evaluation selection_...&#x20;
     * M or FS may add additional 'evaluation suggestions' (see [examples here](https://docs.google.com/document/d/14HXHQTqwJ5VOw-SBoJD8Sd3jathdO9geKdmhdOOx\_Gw/edit)) explaining why it's relevant, what to evaluate, etc., to later be shared with evaluators
   * If requested (in either case), M decides whether to grant embargo/special treatment, notes this, informs authors
3. [M assigns](#user-content-fn-2)[^2] an Evaluation Manager (EM) to selected project (typically part of our [management team or advisory board](../readme-1/discussion-team/))
4. EM invites Evaluators (aka 'Reviewers'), sharing the paper to be evaluated, and (optionally) a brief summary of why the UJ thinks it's relevant, and what we are asking.
   * Potential evaluators are given full access to (almost) all information submitted by author and M and notified of any embargo/special treatment granted.
   * EM may make special requests to the evaluator as part of a management policy (e.g., 'signed/unsigned evaluation only', short deadlines, extra incentives as part of an  agreed policy, etc.)
   * EM may (also[^3], optionally) add 'evaluation suggestions' to share with the evaluators&#x20;
5. Evaluator accepts/declines invitation to review, agrees on deadline (or asks for extension)
   * If accepts, EM shares full guidelines/evaluation template and specific suggestions with evaluator
6. Evaluator completes [an evaluation form](#user-content-fn-4)[^4]; (currently a GDoc; we aim to embed this in an editorial-management-like system in PubPub)
7. Evaluator submits evaluation including numeric ratings and predictions, "CI's" for these
   * _Possible addition (future plan)_: Reviewer asks for 'minor revisions and corrections; see '_how revisions might be folded in..._' in the fold below
8. EM collates all evaluations/ratings, shares these with Author(s)
   * Be very careful not to share evaluators' identities at this point
     * Be extra-careful there is no accidentally-identifying information, especially where evaluators chose anonymity
     * Even if evaluators chose to 'sign their evaluation', do not disclose their identity to authors at this point, but tell evaluators they can reach out to the authors if they desire
   * Share evaluations with the authors as a separate doc/file/space; which the evaluators _do not have automatic access to. (Going forward, this will be automated)_&#x20;
   * Make it clear to authors: their responses will be published (and given a DOI when we can).
9. Author(s) reads evaluations, given two working weeks to submit responses&#x20;
   * _If there is an embargo, there is more time to do this, of course_
10. EM creates evaluation summary and 'EM comments'
11. EM or UJ team publishes each element on our [PubPub](https://unjournal.pubpub.org/) space as a separate 'pub' with a DOI for each (unless embargoed)
    1. Summary and EM comments,
       * With a prominent section for the 'ratings data tables'
    2. Each evaluation (with summarized ratings at the top)
    3. Author response
       * All of the above are linked in a particular way, with particular settings; [see notes](https://docs.google.com/document/d/18Yr95JbeCrDOrn4GpYWamxj2ZcOp9Ex\_arfz-7jZnko/edit)
12. Inform authors and evaluators after this is on PubPub, promote, check bibliometrics, etc.
13. ('Ratings and predictions data' to enter an additional public database)

_Note that we intend to automate and integrate many of the process into an editorial-management-like system in PubPub._

## Considering for future: enabling 'minor revisions'

In our current (8 Feb 2023: Pilot) phase, we have the evaluators consider the paper 'as is', frozen at a certain date, with no room for revisions. The authors can of course revise the paper on their own, and even pursue an updated Unjournal review; and we would like to include links to the 'permanently updated version' in the Unjournal evaluation space.

_After the pilot, we may consider making minor revisions part of the evaluation process._ This may add substantial value to the papers and process, especially where evaluators identify straightforward and easily-implementable _improvements._

<details>

<summary>How revisions might be folded into the above flow</summary>

_If 'minor revisions' are requested_:

* ... the author has 4 weeks (strict) to make these if they want to, submit a new linked manuscript, and also submit their response to the evaluation.
* _Optional_: Reviewers can comment on any minor revisions _and adjust their rating_

</details>

### **Why would we (potentially consider) only 'minor' revisions?**

We don't want to replicate the slow and inefficient processes of the traditional system. We want evaluators to basically give a report and rating _as the paper stands._

We also want to encourage papers as [permanent-beta ](../benefits-and-features/dynamic-documents-vs-living-projects/living-research-projects.md)projects. The authors can improve it, if they like, and resubmit it for a new evaluation.

1. This might occur through the same 'submission form' authors complete
2. Where evaluators chose anonymity, none of their evaluation content should be linked to their real names or identity by design. Still, doublecheck this.
3. We recently were compiling these into a single Gdoc, but this is adding extra work; for now sharing separate files with the author seems a better intermediate solution, until we build an ed. management system.
4. If an embargo was granted, until after embargo ends or the authors release it
5. The evaluators can also ask us to disclose their identity and contact info to the authors at this point, to save them the hassle
6. Make this clear to authors. Authors can reach out to evaluators and share any of this if they wish, but they are not required to do so.

[^1]: Not at NBER and mainly not at CEPR, but see discussion.&#x20;

[^2]: Here, this should be someone on the management team. A field specialist does not need to be the evaluation manager for the paper they recommend, but if not, they should  ask someone on The Unjournal Management Team to help find an evaluation manager.&#x20;

[^3]: Perhaps in addition to any added by the Manager.

[^4]: Atm this is an out-link to a Googe Doc.
