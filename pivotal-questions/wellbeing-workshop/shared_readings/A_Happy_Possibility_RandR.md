# A Happy Possibility About Happiness Scales: An Exploration of the Cardinality Assumption

---

## 0. Abstract

Researchers routinely use numerical ratings of subjective wellbeing—such as "How happy are you, on a scale of 0–10?"—as if they were cardinal. Whether this assumption is justified has become a central issue in wellbeing research. This paper offers a primarily theoretical analysis of that issue. First, it clarifies the conceptual terrain, including by distinguishing between ordinalism, quasi-cardinalism, and cardinalism, and so arguing that the traditional ordinal–cardinal dichotomy is too narrow. Second, it develops a Grice–Schelling rational response theory, according to which rational communicators would use linear most–least scales and near-cardinality is a reasonable expectation for subjective wellbeing data. Third, the paper reviews recent empirical work in light of this framework and find weak deviations from cardinality are supported by the evidence, but not extreme ones. The conclusion is modest: treating subjective wellbeing data as cardinal is not clearly mistaken, though this judgement remains open to revision.

---

## 1. Introduction

In research and everyday life, we use *subjective scales*, where we put numbers on our feelings or judgements, for instance with 0–10 numbered scales or 1–5-star ratings. We can and do use these to convey our assessments of almost anything, including movies, restaurants, jobs, and taxi drivers.[^1]

Here, I am particularly concerned with use of such subjective scales to rate *subjective wellbeing* (SWB), our self-reported quality of life, such as our happiness or life satisfaction (OECD, 2013). Numerical data on SWB are now routinely collected, analysed and used not just by academics, but by national governments and companies. We would not do this if we thought these numbers were meaningless (Bertrand & Mullainathan, 2001).

Yet, there is something paradoxical about subjective scales. They are intuitive and mysterious. When we ask someone how happy they are, and they say 2/10 rather than 9/10, we believe we understand them, at least roughly, and that there is a big difference between the two. Yet what *exactly* does a 2/10 *mean*? Kaiser and Oswald (2022) suggest "they are 'made-up' numbers on a scale that does not exist". One oddity is that we are trying to put an apparently unbounded phenomenon on an apparently bounded scale: there's no logical limit to how happy someone could be, so what does '10/10' capture? (Ng, 1997)

A growing concern in the literature is how to interpret these numbers. Researchers often treat the scales as *cardinal* (Kahneman & Krueger, 2006; Ferrer-i-Carbonell & Frijters, 2004; OECD, 2013). This requires assuming (A) a *linear scale*, so each number represents the same size change and (B) a *comparable* scale, so that items on the scale have consistent meaning across people and times. If both these assumptions hold, scale use would be cardinal, and then the difference between, say, a 2 and 3 for one person would mean the same size change as that between and 7 and an 8 for another individual (Ferrer-i-Carbonell & Frijters, 2004; OECD, 2013: 189-90).[^2] Both these assumptions depend on the nature of the *reporting function*, the process by which individuals convert latent feelings (or judgements) into numbers on a bounded scale (Oswald, 2008).

There is long-standing scepticism about this assumption of cardinality and, consequently, the scientific value of 'feelings data' in the social sciences, particularly within economics (Bond & Lang, 2019; Ferrer‐i‐Carbonell & Frijters, 2004; Hausmann, 1995; Kaiser & Oswald, 2022; Kristoffersen, 2010; Layard, 2003; Robbins, 1932; Schröder & Yitzhaki, 2017). Researchers often hold that all we can assume about the reporting function is that it is ordinal, representing a ranking. We might, for dramatic effect, call this disagreement over the reporting function, and whether it is better understood as ordinal or cardinal, the *cardinality wars*.

The issue of what reporting function(s) people use, and consequently, how to interpret data from subjective scales, has not attracted much attention until recently. Kristoffersen (2011) calls the cardinality issue "the elephant in the room"; Kahneman & Krueger (2006) noted it was not well understood if there are individual differences in reporting or what reasons we have to expect such differences.

In the last few years, however, there has been a sudden interest in investigating this topic, often with sophisticated mathematical methods. Some researchers have drawn very sceptical conclusions about cardinality. They point if we made alternative assumptions about how respondents interpret subjective scales, existing findings in the wellbeing literature will not hold (Bond & Lang, 2019; Schröder & Yitzhaki, 2017). This paper's title is a reference to Bond & Lang (2018), which is entitled *The Sad Truth About Happiness Scales*. Others have drawn more optimistic conclusions (Kaiser, 2022). I mention several other notable contributions in a footnote.[^3]

**This paper makes three contributions. They are primarily theoretical.**

The first contribution is to provide conceptual clarification and map the terrain. I cover theories of measurement, the concern subjective wellbeing scales do not measure quantities, and measurement error. From there, I explain why we need to distinguish between three positions—*ordinalism*, *quasi-cardinalism*, and *cardinalism*—and thus that the traditional ordinal–cardinal dichotomy is too crude (Ferrer-i-Carbonell & Frijters, 2004). I argue that ordinalism seems unpromising, but that quasi-cardinalism deserves more attention as a middle view, according to which subjective scales capture quantitative information but with some bias; I observe there are many ways to be quasi-cardinalist.

The second and central contribution is to develop a Grice–Schelling rational response theory. Drawing on Paul Grice's account of cooperative communication and Thomas Schelling's notion of focal points, I argue that rational respondents, seeking to make themselves understood, will tend to use a linear, most-least scale (Grice, 1989; Schelling, 1960). If respondents converge on the same quantities for 'most' and 'least', on a given scale, that scale would then be comparable and so, given linearity, cardinal. I then argue it's plausible that subjective *wellbeing* scales are comparable, even if other subjective scales—such as those for self-rated health quality—are not, and that the Grice-Schelling theory can explain this disparity. The theory is *normative*, about what it would be rational for people to do, rather than *descriptive*, about what they actually do. It provides an explanation why near-cardinal scale use is a reasonable expectation for subjective wellbeing data but does not prove actual use is near-cardinal.

The third contribution is to apply the two earlier, theoretical parts of the paper to bear on the current empirical findings and discussions in the cardinality wars. The general picture is that the evidence supports weak violations of cardinality, that is, a weak form of quasi-cardinality, but that strong violations are not supported. I point out is an open question of how practically important these weak violations may be; this requires further investigation than has happened so far and depends on the question being asked. The discussion is interpretative rather than adjudicative: it shows how the conceptual framework developed here can help make sense of the mixed empirical record and guide future research.

**The overall conclusion is fairly modest.** I do not and cannot prove that subjective well-being scales *are* cardinal, only that it is not clearly mistaken to treat them as such. The argument clarifies why cardinal interpretation is a reasonable working assumption in many contexts, while recognising that the validity and limits of that assumption remain open to further empirical investigation. The conclusion that researchers are probably correct to keep doing what they were already doing is not, in general, very interesting. It is more interesting in this case, given the concerns raised by Bond and Lang (2019) and others that subjective wellbeing researchers might be grievously in error in their current practices of assuming cardinality.

Before we dive in, two final comments.

First, an array of work has already indicated that subjective wellbeing metrics are, by the standards of social science *valid*, that is, they capture what they set out to: for instance, that *purported* measures of life satisfaction do really measure *underlying* life satisfaction (Csikszentmihalyi & Larson, 1987; Diener et al., 2013; OECD, 2013).[^4] Nothing here challenges the validity of subjective wellbeing metrics. But even if subjective wellbeing measures are valid, it is an open question of which reporting function respondents use.[^5]

Second, the paper is motivated by the (uncontroversial) view that feelings matter morally, and the (far more controversial) position that subjective wellbeing scores should be a, if not the, ultimate outcome measure in decision-making – in public policy, philanthropy, indeed anywhere (Frijters et al., 2020; Plant et al., 2025). However, I do not argue for those claims here; they are separate issues. I am interested here in how well we can measure feelings, rather than with what, if anything, we should use such measures for.

---

## 2. Clarifying the debate – cardinal *or* ordinal?

If you ask a social scientist about measurement, they will, following Stevens (1946) tell you about four types of scale. A *nominal* scale labels categories without any order (e.g. blood types). *Ordinal* scales rank items but do not assume equal intervals between numbers (e.g. race positions). *Interval* and *ratio* scales are quantitative in the sense that the numbers represent meaningful differences in magnitudes in the underlying property. The difference between interval and ratio scales is that only the latter has a meaningful zero point (temperature, measured in Celsius, is an interval scale, whereas height and weight are ratio scales). Such scientists might not immediately mention a cardinal scale, which refers to any scale with meaningful differences, and so thus is an umbrella term for interval and ratio scales.

When researchers ask if subjective scales should be considered cardinal, they are typically worrying about the scale interpretation (Oswald, 2008). The thought goes like this. We, the researchers, assume that they, the respondents, treat the scales as at least ordinal – that higher category represents higher levels of feelings. But we are not sure what quantitative information, if any, we can take from their responses.

More specifically, the query is whether we can take the numbers at 'face value', where we assume that they are using a linear, comparable scale. While the phrase 'cardinal scale' most literally means any scale containing quantitative information, the way wellbeing researchers tend to use it is to refer to a linear, comparable scale, and that is how I will understand the term 'cardinal scale' here. Researchers also tend not to specify if the cardinal scales are interval or ratio. Here, my discussion is about interval scales. I do not inquire about meaningful zero points.

The reason we want to know whether wellbeing scales are cardinal (in the above sense) is that, if they are, it would justify taking raw self-reported data from individuals, then adding and subtracting the numbers, take averages, and so on. If, for example, each 1-point increase represented a doubling in magnitude (a logarithmic scale) or the numbers meant different individuals or groups (non-comparable scales), doing this would not be justified. If we think of subjective (wellbeing) scales as like measuring sticks, but for feelings, researchers are asking if we can assume that everyone is using effectively using a standard-issue one-meter ruler or whether people's measuring sticks are wonky and/or differently lengths.

### 2.1 The quantity objection

Before I say more about scale interpretation, I note distinct lurking worry, namely about whether happiness and other feelings are measurable as quantities. Philosophers of measurement distinguish between properties that are merely orderable and those that are genuinely quantitative, whose degrees stand not only in ordering relations but also in relations of equality or difference. The Representational Theory of Measurement (RTM) formalised this distinction, showing that quantitative representation requires specific empirical axioms—such as additivity and independence—that justify mapping an empirical structure onto a numerical one (Krantz, Luce, Suppes & Tversky, 1971; Krantz, 1991).

However, critics such as Michell (1999, 2012) and Trendler (2013) argue that psychologists have not empirically shown, nor even really attempted to show, that mental states pass the test required by RTM. On this view, we should not conclude that subjective ratings of mental states can count as genuine measurement until such tests are met. Trendler (2013) argues that psychology may *never* be able to justify the axioms required for quantitative measurement, because mental phenomena don't behave in ways that allow the necessary empirical tests. RTM requires, *inter alia*, empirical concatenation operations, which are easily satisfied for physical quantities such as length or mass—for example, by placing rods end-to-end—but there is no obvious analogue for mental magnitudes. We cannot combine two pleasures and observe that the sum equals the parts. This line of criticism, sometimes called the *quantity objection* (Heidelberger, 2004; Michell, 2012; Larroulet Philippi, 2024) questions whether mental phenomena are the kinds of properties that can have quantitative structure at all.

Even if a claim has not been proven according to one theoretical framework, that does not mean the claim is false. If Trendler (2013) is correct that, under RTM, psychological measurement is impossible in practice, that may suggest a limitation of RTM. Perhaps RTM's demanding axioms need revision—but that is not a topic for this paper.

Here, I do not attempt to establish the quantitative structure of well-being in the strong sense required by RTM. I assume, with others (Ng 1997; Bond & Lang 2019), that what subjective wellbeing scales measure *are* quantities. I then go on to ask the pragmatic question about scale interpretation: whether it is reasonable for researchers to treat these scales as approximately cardinal for aggregate analysis. In doing this I am making explicit a commitment that researchers who ask the standard 'scale-interpretation' question must implicitly already accept. As Larroulet Philippi (2023) observes, to inquire whether measures of happiness, and the like, are cardinal *already presupposes* that happiness itself has a quantitative structure; otherwise the question would be a category mistake: necessarily, we cannot have cardinal scale of something that is not a quantity.

The history of quantification in science suggests that quantitative interpretation typically emerges gradually, through the coordination of theory, instruments, and practice, rather than being proven in one step (Chang, 2004; Sherry, 2011; Miyake, 2017). These historical examples suggest that psychological measurement may likewise evolve through refinement rather than through immediate proof, supporting a pragmatic stance on the cardinal use of well-being scales. It may be that wellbeing scales are already approximately cardinal, and this will become clear after assembling converging lines of evidence. Or, perhaps current survey instruments do not yet yield cardinal data, and some refinement of the instrument, or reanalysis of the results, may be possible; I return to these points later.

I should perhaps briefly defend the quantitative assumption. Eddon (2013) argues that quantitative properties have two key features. First, degree structure: the property varies along a continuum. Second, metric relations: there are facts about how much one instance differs from another, not just which is greater. This is certainly how we talk about feelings, with expressions such as "that hurt me *as much as* it hurt you" or "I enjoyed that holiday twice as much as the last one", as Ng (1997) observes. Hence, the sceptic of feelings-as-quantities seems to owe an 'error theory'—in Mackie's (1977) sense—explaining why our ordinary and scientific discourse systematically treats feelings as magnitudes when, on the sceptical view, no such magnitudes exist. A challenge for any such error theory is that the most natural way to explain how we achieve any ordering is that there is an underlying quantitative structure that grounds this ordering–the ordering of people by their height is a function of their actual heights. It is not clear to me what alternative, plausible explanation is on offer to ground the ordering of feelings.

Finally, there is a long precedent of philosophers holding that feelings are quantities, stretching from Bentham's famous 'felicific calculus' through Edgeworth's 'hedonimeter' to the present day (Bentham 1789; Edgeworth 1881; Sidgwick 1907; Feldman 2004; Crisp 2006). Rejecting the claim that pleasure and pain have magnitudes would make ethics and welfare comparisons practically incoherent. So even if we cannot technically prove, as per the Representational Theory of Measurement, that feeling are quantities, we have good practical reasons for assuming it.

### 2.2 Measurement error and the challenge of cardinal scale interpretation

If people interpret subjective scales in a linear, comparable way, their responses will be cardinal. We should not expect that people will always do this (how they would do so I come to later). In other words, there will be measurement error. We should always expect measurement error, but measurement instruments don't need to be perfect to be useful. Hence, the important question to ask is: is there *enough* measurement error that we draw the wrong conclusions by assuming subjective scales are cardinal?

Following Kahneman et al. (2016) it is helpful to distinguish two types of measurement error: *noise* and *bias*. Noise is the random variable of errors, whereas bias is a systematic deviation from the true answer. See Figure 1.

> **Figure 1.** Distinguishing accuracy, noise, and bias. *(Figure from Kahneman et al., 2016)*

If scale use is idiosyncratic but random, variation in individuals' scale use would constitute noise. Noise is not a major threat for cardinal interpretation, as researchers have noted (Bronsteen et al., 2012; Dolan & White, 2007).[^6] If surveyed populations are randomly selected and large enough, deviations should 'wash out': those using a 7/10 rather than a 6 will be cancelled out by those using a 5 rather than a 6, so the *average* answer is accurate.

We need to be alert to bias—non-random deviations—as these won't 'wash out' with more data. If the scales are comparable, but non-linear (i.e. 'wonky') no amount of extra measurement will yield cardinal data. Similarly, if groups A and B each use a linear scale, but those scales are not comparable to each other (i.e. they represent different levels of feeling), the same number of each scale will mean different things no matter how much data we collect.

### 2.3 Cardinalism, quasi-cardinalism, and ordinalism

We can now see why the natural framing of the debate—are subjective scales cardinal *or* ordinal?—seems an unhelpful dichotomy (Frijters, 1999; Peart & Levy, 2005; van Praag, 1991). There is a third option, that subjective scales capture quantitative information, but there is *some* bias—exactly how much is a further question.

Hence, we can distinguish three positions in this debate. The distinction between them is epistemological: it relates to what we think we (can) know about the reporting function. Returning to the sticks analogy, *cardinalism* is the view that people use (in aggregate) using straight measuring sticks of the same length—the scales are linear and comparable—and we are sufficiently confident of this that it is appropriate to treat raw data from self-reports as cardinal.

*Quasi-cardinalism* is the view is that our measuring sticks are bent, unevenly marked and/or differently lengthed to *some* degree—they are non-linear and/or non-comparable—so there is bias. However, quasi-cardinalists believe we can identify the direction and extent of bias, which means we can transform respondents' data so that they become cardinal ('straighten and adjust the sticks'). This would present a further methodological challenge but is *not* a terminal problem for ever interpreting subjective data as cardinal.

Finally, *ordinalism* is the position we do not know—cannot 'see'—which measuring sticks people use for their feelings.[^7] Specifically, I use the term to refer the view that, beyond within-person ordering, we lack warranted conclusions about quantities of feelings within or between people, even if the underlying feelings are assumed to be quantitative.

This three-fold distinction is important, because the current two-fold of the debate is overly reductive. Progress in the cardinality wars will likely come from investigating the nature and degree of quasi-cardinality in the measures. But let's briefly consider ordinalism before returning to this issue.

### 2.4 How plausible is ordinalism?

It is worth understanding what the ordinalist positions entails. While it may be popular, even standard, to hold it in the seminar room, it is not a view we seem to accept in the rest of our lives. If person A says they are 9/10 happy, and B says they are 2/10, I expect we would all guess, on the balance of probabilities, A is happier than B. At least, we would guess this unless we had strong evidence that A used their scale very different from B such that B really was happier. But note that someone who thinks we *can* have the sort of evidence think that we can know something about how to relate numerical self-reports to their underlying intensities of happiness—and thus accepts quasi-cardinalism, not ordinalism.

In contrast, the ordinalist seems committed to a strong form of epistemic restraint about interpersonal magnitudes—not necessarily denying interpersonal ordering, or that there are underlying quantities, but denying that we are warranted in treating reported differences as carrying quantitative meaning. A question for the ordinalist is whether they want to apply this restraint just to surveys, or in general. I expect few people will want to say, when comparing a laughing man to another crying man, we are unwarranted in assuming the former is happier. But if it seems reasonable to do this in general, it is not obvious why we should not want to draw the same conclusion based on survey data. The Grice-Schelling theory of rational communication, given later, can make sense of why would think we are ordinarily justified in assuming that A is happier.

In the literature, 'ordinal' is sometimes used to mean everyone has the same reporting function, but we don't know what it is (see e.g. Benjamin et al. (2024)). In terms of what I've said above, this means scale interpretation is comparable but not linear, and the type of non-linearity is unknown. Is this a plausible ordinalist view, one that represents an appropriately epistemic restraint? On reflection, the position is deeply puzzling, even inconsistent. If we don't know which reporting function people use, on what grounds can we be confident that they all use the same one? It's unclear why we think we have epistemic access to facts about comparability, but not about linearity.

Ordinalism, then, requires a greater degree of epistemic scepticism that most researchers or laypeople seem to have. Given this, the main debate is between cardinalism or quasi-cardinalism.

### 2.5 Quasi-cardinalism to the rescue?

Now we've seen there are three options on the table but ordinalism looks unpromising, a natural thought is this. Cardinalism is too optimistic. Ordinalism is too pessimistic. Thus, quasi-cardinalism is the 'Goldilocks' view all sensible researchers should accept.

Matters are not so straightforward. Quasi-cardinalism is not a single view but refers to a family of views. The quasi-cardinalist merely holds subjective scales are not linear and/or not comparable in some way. Hence, the quasi-cardinalist holds an indeterminate, 'none of the above' view unless they specify which *particular version* of the view they accept instead. To illustrate this, figures 2A-F indicates some of the different possible reporting functions. The cardinalist accepts 2A, the ordinalist accepts 2F, and 2B-E are just some of the options to the quasi-cardinalist can choose between. For brevity, I won't explain the figures here; I hope they are substantially self-explanatory to the interested reader.

> **Figure 2A.** Cardinal scale (linear and comparable)
>
> **Figure 2B.** Arc-tangential scale
>
> **Figure 2C.** Logarithmic
>
> **Figure 2D.** Two linear, non-comparable scales
>
> **Figure 2E.** Two partially linear, non-comparable scales
>
> **Figure 2F.** Ordinalism

The reason I set out these options is to demonstrate that rejecting cardinalism does not end the debate—it does not bring the 'cardinality wars' to an end. It raises a further question of which *version* of quasi-cardinalism is more plausible than cardinalism. Mere uncertainty about how people use subjective scales is not sufficient for quasi-cardinality, for the same reasons given about 'noise' in measurement earlier: if we think it's equally likely that group A uses a longer scale than B as it is that A uses a shorter scale, we will still conclude that scale use is comparable in expectation. To get quasi-cardinalism going requires identifying a particular type and magnitude of bias, not a generalised concern.

Later, we'll come to whether it matters, in practice, if (some version) quasi cardinalism were true: that depends on the question being asked and the nature and degree of the deviation from cardinality. But, having clarified various aspects of the debate, let's turn, in the next section, to whether ordinary communicative practices give us independent reasons to expect near-cardinal scale use.

---

## 3.1. How should rational respondents interpret subjective scales? The Grice-Schelling account

Discussions about the nature of subjective scales—that is, the assumptions of linearity and comparability in reporting—are often quite mathematical. For instance, Ferrer-i-Carbonell & Frijters (2004) use different statistical tests suited to cardinally and ordinally comparable data, find these don't give different results, and conclude it is sensible to treat the data as cardinal. While such work is helpful, it misses a human element. The question at hand is how people communicate how they feel when given surveys. Something we want to have an account of, then, is what might be going on in people's heads.

In this section, I propose a *rational response theory* for subjective scales, setting out how it would be rational for respondents to use subjective scales, assuming their aim is to accurately communicate their feelings.[^8] The idea is that certain ways of communicating are more likely to lead to being understood, and thus more rational. I call this the 'Grice-Schelling' theory, given it takes inspiration from philosopher of language Paul Grice (1989) and economist Thomas Schelling (1960). The theory implies the rational way for respondents to interpret subjective scales is also the simplest, most obvious way: a linear scale where the endpoints refer the realistic most and least of whatever is being measured. If respondents use linear, comparable scales, then, in aggregate, their answers will be approximately cardinal. A potential issue is the *reference class* respondents use when choosing these 'most' and 'least' endpoints. A virtue of the Grice-Schelling theory is that it can explain when and why reference classes would differ, although such differences will limit cardinal interpretation. I argue that these worries about differing references classes may not be a major concern for the comparability of subjective wellbeing, even if they are in other cases.

Why consider a theory of rational response at all, rather just try to infer from the data what people actually do? First, we often think that if we know what it is rational for people to do, that will help us predict or understand their behaviour; deviations for rationality require explanation in the way conformity with it does not. Second, even if the data were decisive about what people do, we would still want a theory to explain this. Third, and most importantly, without a theory it can be hard to make sense of the data. Data are always open to multiple interpretations, which scientists evaluate by appealing to inference to the best explanation. Subjective data are especially open to interpretation, given we necessarily cannot measure them objectively. As we shall see, discussions of how respondents interpret subjective scales thus depend substantially on which assumptions about their reporting behaviour are deemed reasonable and which are 'heroic', an account of rational reporting can therefore help us make sense of these.[^9]

I anticipate readers' 'mileage will vary' with respect to how informative this *normative* argument from rationality is to the *empirical* claim that scale use is, in practice, approximately cardinal. I expect some will conclude that the assumption of (approximate) cardinality in subjective scales is now relatively unproblematic without seeing further empirical data whereas others will remain unmoved. In any case, I hope this offers useful theoretical structure that the new wave of empirical researchers conducting technical analyses of happiness data can use to formulate and test their hypotheses.

### 3.2. The problem

Let's work towards what is rational by first making the challenges of using subjective scales explicit.

Suppose I ask, "How happy are you, on a scale of 0-10?" This is an easy, familiar question. It does not require effortful 'system 2' thought, such as, "What is 15 x 15?" (Kahneman, 2011). Nor does it seem confused, such as, "How tall is the King of France?" (cf Russell, 1905). Notice we can easily and quickly give apparently meaningful answers about many properties, not just happiness. This is true even when the scales are vaguely labelled scales of objective dimensions ("How tall are you, 0-10?") or we have never rated the thing before ("How good are those clouds, 0-10?"). It is not difficult to answer when no scale is given: if I ask, "How good was the concert?", we might use a verbal label ("Pretty good") or a number ("Hmm, 7 out of 10"), indicating we use verbal and numerical labels interchangeably to refer to intensities of feeling.

Although these questions are intuitively easy to answer, doing so requires respondents to solve three problems, as Fleurbaey & Blanchet (2013) point out: (1) the *scope* problem: "What information is important for my evaluation?"; (2) the *ranking* problem: "How do I rank the options based on the information in my scope?"; (3) the *calibration* problem: "How do I translate a position in this ranking into a numeric value on a finite scale?"

Here, we are just concerned with the calibration problem, which refers to what we've called the reporting function.[^10] Calibration requires respondents to fill in two sets of details about the scale. One is to decide what the endpoints of the scale mean, e.g. how happy do you have to be to be a 10/10 or a 0/10?[^11] This raises an issue of how unbounded phenomenon be constrained to a bounded scale, which I return to later. Even if I tell you that 10/10 means 'very happy' and 0/10 means 'very unhappy', you must still decide what *those* mean.

The other choice is the shape of your reporting function: the magnitude differences between the points on the scale (Oswald, 2008). As we saw above in figure 2A-C, there are various options. One might use a linear scale, meaning the difference between each point on the scale is equal-interval. But you might do something else: for instance, you could treat your happiness scale a bit like the Richter scale for earthquakes, using a logarithmic function so that each 1-point scale increase represents a 10-fold increase in feeling.

### 3.3. Towards a rational response theory

What would it be rational for individuals to do?

An observation made by philosopher of language Paul Grice is that conversations are cooperative endeavours, where speakers and listeners rely on each other to think and act in certain ways in order to be understood (Grice, 1989). Grice proposed the *cooperative principle*: "Make your conversational contribution such as is required, at the stage at which it occurs, by the accepted purpose or direction of the talk exchange in which you are engaged". This principle has several maxims, which are, roughly: to be truthful, to give no more and no less information than required, to be relevant, and to be clear. It's because of these background maxims that there are what Grice called *conversational implicatures*, conclusions that hearers can draw about what the speaker means without them being literally stated. For instance, if I turn to my colleague and say, "Get the door, will you?" they are likely to conclude I want them to *close* the door, not that I want them to take it off its hinges and bring it to me, even though the latter is more literally implied.

We can take two relevant lessons from this. First, individuals often aim to be cooperative communicators. Second, they will use the available contextual information to determine how best to achieve this end. Hence, it seems reasonable to assume that, when surveyed about their feelings, their aim will be to convey those accurately, and to interpret the questions in a way that facilitates this (Schwarz, 1995).

The difficulty for respondents is that subjective scales are vague and they cannot communicate with each other about which exact interpretation to use. Rational respondents would conclude that to successfully cooperate requires anticipating how *other people* interpret the scale and then attempting to interpret it in the *same* way so that their answers have the equivalent meaning. To illustrate, if I am confident my 6/10 represents a different amount of happiness from everyone else's 6/10, but I use it anyway, I am acting irrationally—at least, eccentrically—if my goal is to be understood. Note, there is nothing special about using numbers or reporting feeling here; we are focusing on an instance of the general communicative norm that we adapt our communication to make ourselves understood (cf. Wittgenstein's (1953) Private Language argument).

Turning from philosophy to economics, individuals are, in game-theoretic terms, seeking a *Schelling point*, also known as a *focal point*, a default solution picked in the absence of communication (Schelling, 1960). I can't check with everyone else what they mean by '10/10 happiness', so I must infer this. The most famous illustration of the Schelling point is the New York question: if you are to meet a stranger in New York City, but you cannot communicate with the person, when and where will you choose to meet? Thomas Schelling, the economist after whom the term is named, asked a group of students this question, and found the most common answer was noon at the information booth at Grand Central Station. Although one could meet anywhere, certain options are, for whatever reason, more salient and more likely to lead to successful coordination.

Hence, on this Grice-Schelling rational response theory of scale interpretation, individuals are trying to cooperate and make themselves understood, which they do by coordinating around focal points in their use of subjective scales. Let's quickly note three things.

First, nothing in this framework *guarantees* comparability: even fully rational communicators may sometimes converge on different focal points in different contexts, leading to degrees of quasi-cardinality. The framework is intended to explain why cardinal use is a natural default for reporting on subjective well-being, not to rule out all non-cardinal patterns of use.

Second, there is, in contrast, no need to find focal points when using scales of objectively measurable properties: if I ask you your height in centimetres, there is no uncertainty about how to use the scale.

Third, although I frame this as how someone would reason, starting from first principles, I am not claiming that people explicitly engage in such reasoning when presented with 0-10 scales. I am proposing a norm for what it would be rational for people to do. However, drawing on the Gricean analysis, it seems plausible we implicitly follow communicative norms without knowing what those norms are.

What, then, are the focal points for subjective scales? I already suggested they are using a linear scale with the realistic endpoints of whatever is being measured. Hence, 10/10 happiness is effectively 'most happiness possible', the largest happiness someone could actually have, 0/10 is least happiness, a 10/10 job candidate is the best job candidate you could expect, and so on.

I expect some readers, on encountering this explicit proposal of how we use subjective scales, will consider this an uncontroversial recognition of what we already implicitly do—if so, that's support for the theory. But it may not be obvious what the alternatives are and why it would be eccentric to use those. Let's dig deeper into each aspect.

### 3.4. Why is a linear scale rational?

A natural candidate for the reporting function is a linear scale. We're used to using cardinal scales in ordinary life: we use them for height, weight, length, and so on (Ferrer-i-Carbonell & Frijters, 2004). Hence, they are a familiar, default option.

One alternative to the linear reporting function is the arc-tangential function proposed by Ng (2008) and mentioned earlier (fig 1B). Ng's rationale is that, as there is no logical limit to happiness, the use of a linear function that covered the full *logical* range would make typical changes to happiness impractical to report. For instance, becoming unemployed would only register an interpretably tiny difference on the scale–say, a move from 5.1 to 5.100002. Ng supposes the advantage of the arctangent is that it makes the scale's middle comprehensive, while still allowing very high and low happiness scores to be represented at the top of the range.

One challenge is that non-linear scales require more cognitive effort: intuitively, we perceive feelings in cardinal increments (Edgeworth, 1881) so it then requires further work to put those onto a non-linear scale. As an example, in discussions, various researchers have suggested to me that each one-point increase on a 0-10 scale might represent a doubling in the intensity of happiness (an 8/10 is 4 times higher than a 6/10, etc.). This strikes me as both unintuitive and prohibitively cognitively demanding. When I think about how I answer happiness questions, my introspective assessment is that I use (something close to) a linear scale. So, to provide my answer on such a scale, I would then have to think very hard about how to translate my feelings on such a scale. Without consulting a friend, a textbook, or the internet, I do not know what 7/10 on a linear scale represents on a logarithmic doubling scale (even assuming it's a ratio scale and 0/10 is the zero point), but perhaps readers would.

The more general challenge, given you want to make yourself understood, is that there are an infinity non-linear scales, and you could not expect the surveyor (the one asking the questions) to guess what *specific* deviation from linearity you are using—how bendy *your* measuring stick is. Whilst *you* may know what you mean by 8/10, the surveyor will not and will instead assume you mean the same as everyone else. *Pace* Ng (2008), idiosyncratic non-linear use—where you curve you scale in a way others cannot anticipate—would be irrational, in the sense I use the word here, because you would predictably communicate inaccurately.[^12] It is akin to playing Schelling's New York game and expecting someone you've never met to know you expect to meet them at your favourite deli. Indeed, the greater the deviation from linearity, the more irrational the choice would be, as you would be misunderstood to a greater degree.

Some readers may be puzzled by suggestion that a linear scale is the rational choice. They might think the claim it's rational to use a linear scale for feelings is in tension with the fact that going from a 7/10 for happiness to an 8 requires only a small change to one's life–getting a modest raise, say—whereas to getting to a 9 or a 10 requires major changes, such as winning the Nobel prize or writing a bestseller.[^13] However, this tension disappears when we realise that, when we are talking about 'life changes', we seem to be referring to magnitude changes in the *objective conditions of one's life*, not to magnitude changes in *subjective feelings*.

There is nothing odd about the following: if you're 7/10 happy, the objective conditions of your life don't have change much to cause a certain size improvement in your happiness, but that, to get the *same size improvement in your happiness again*, you would need a much bigger improvement in your *objective circumstances*. A more familiar way to think about this idea is that we expect that giving $1,000 to a rich person will cause a smaller increase in happiness than giving the *same amount* to a poor person. This is to say we expect there are non-linear relationships between (1) objectively-measurable things and (2) actual feelings. But this observation provides no direct challenge to what we are concerned with, namely the claim there is a linear relationship between (2) actual feelings and (3) reported feelings.

I should note a related potential confusion. Readers may be familiar with the Weber-Fechner law in psychophysics, which is that it takes roughly a doubling in (1) some objectively-measured property, e.g. light or sound, for people to feel a 1-unit difference in (2) subjectively-perceived intensity (Stevens, 1957). This is sometimes misunderstood as providing evidence *against* there being a linear relationship between (2) and (3) (Portugal & Svaiter, 2011). This is a misunderstanding because the conclusions of Weber-Fechner law rely on *assuming* linear reporting and hence cannot be taken as evidence against linear reporting. The explanation is somewhat intricate, so I have put it in a footnote for the interested reader.[^14]

Recall that the original motivation for using something like the arc-tangential scale proposed in Ng (2008) was that there is no logical limit to happiness, but we want to represent the full range of possibilities. In the next section, we turn to the issue of what rational communicators would use for the scale endpoints. I argue rational communications would not (attempt to) use the logical limits. If this is correct, then not only is there a clear problem with using non-linear scales–no one could guess which precise non-linearity you've opted for–we also lack a positive reason to use non-linear scales. Hence, linear scale use seems the natural rational choice.

Of course, these are all arguments about what rational respondents *would* do, and not an assertion that all respondents do. We see the evidence later is somewhat mixed. My point is that, given these Grice-Schelling coordination pressures, we have a prior in favour of simple, roughly-linear reporting functions.

### 3.5. Why is it rational to use realistic most-least scale for the endpoints?

Rational respondents will aim to converge on the same endpoints as each other to make their own answers comparable and thus comprehensible. But which endpoints should one use? A natural choice is to use actual (or realistic) limits, that is, the most and least of whatever we are referring to in the context at hand. We can see this by considering the alternatives.

If you use a shorter-than-actual scale you're going to run out of room when comparing yourself over time or to others. If I rate myself as 10/10 today, when I know I could be happier tomorrow and/or that others could be happier than my 10/10, how can I convey those higher levels on my scale? I must either change my scale, which the surveyor won't know I've done, or use an ambiguous scale where 10 can refers to '10 and above'. This would reduce communicative accuracy, so rational respondents would try to avoid it. In fact, it is *only* possible to use a linear reporting function if your scale covers the full range of the values. This is shown in figure 2E above: if your scale were linear in the middle, but its range did not contain the limits, the end categories would effectively expand to cover the remaining range, making the scale non-linear in part. We've already seen how a non-linear scale makes communication harder, which is a reason to avoid too-short scales.

What about using a longer-than-actual scale? Which would we choose? There's no logical limit to happiness, so there's no sensible way to report that on such a scale—this is the problem regarding Ng's (2008) proposal above. Similarly impractical would be the nomological limits, the maximum within the laws of nature—where are those? You could use something arbitrarily larger than the real limits—for instance, two times the maximum—but unless you knew others were doing the same, you'd expect your answers to be misunderstood.

An advantage of using the actual limits is that it provides a relevant stopping point: the scale always needs to be *at least* this wide to convey the possibilities, but it never needs, in practice, to be wider. A further advantage of the actual limits is that you will have some idea of where they are, so will others, and you know this, which makes coordination more feasible. We observe many of states of, for instance, happiness, and we communicate about this a lot, so we share an understanding of the upper and lower realistic limits. (This leads to a worry about whether people use the same reference classes for most and least, which we consider in the next section.)

Hence, rational respondents, when presented with a vaguely defined subjective scale, is to take the top and bottom of it be the realistic most and least of whatever is being measured: that is the focal point.[^15]

From here, we can address the issue of how we could use a bounded scale to measure something unbounded: how can the happiness scale only go to 10/10 when there is no logical limit of happiness? The suggestion is that we intuitively stretch our scales so that they include all the actual possibilities.[^16] In this case, although the scale is bounded in theory, it is not in practice, because it captures all the cases we need to refer to—namely, the actual ones. This is a bit like a kettle measuring water temperature up to 100 degrees centigrade: H₂O can be hotter, but if want to measure water, it's not important for the kettle's scale to detect this.

### 3.6. Reference classes, uncertainty, and realistic endpoints

A lurking worry is even if rational respondents aim to, in general, use the realistic most and least of whatever being referred to, that does not mean they will use the same reference class for the endpoints. We should distinguish between two worries here.

One is (mere) *endpoint uncertainty*, not knowing what the realistic maximum and minimum are even though you know what's being referred to. Suppose I am asked how tall I am, 0-10, for people in my country. I don't know exactly how tall the tallest person is. Equally, how confident can I be about what maximum happiness is?

This will introduce noise rather than bias and so won't be as serious a problem. Respondents don't need to all guess the correct answers for the maxima and minima. All that's needed is for each of them to some idea what the endpoints are, and for differences in guesses to be random: if so, differences will 'wash out' as noise and the averaged answer will be accurate. The classic example of this 'wisdom of the crowds' effect comes from Galton's (1907) famous experiment of asking people to judge the weight of an ox at a country fair: individual answers were inaccurate, but the averaged guess was accurate.[^17]

The second issue, which is more serious, is that respondents use different *reference classes* for the endpoint; this will introduce bias leading to quasi-cardinality. To give a simple example, if we put groups of (A) basketball players and (B) jockeys in different rooms and ask them "how tall are you, 0-10, for the people in this room?" the *rational* response for the cooperative communicator is to adjust their scale to the reference group, meaning an 8/10 in (A) will refer to a greater height than in (B). The Grice-Schelling theory implies will be rational to use different senses of 'most' and 'least' in difference contexts—not that endpoints are context invariant.

Is this necessarily a problem for interpreting responses as cardinally comparable? That depends on what the researchers are trying to measure.

If we want to measure the respondent's own assessment, by their standards, at that moment, then shifting endpoints is not a problem for comparability: it is part of what we want to measure.

If we want a stable measurement of some (physical) property, shifting endpoints may be an issue.

To draw this out, take the literature on response shifts in quality of life (QoL) in health, which documents that people engage in *recalibration* (changing internal standards) *reprioritisation* (changing what matters) and *reconceptualisation* (changing what 'health' means) (Schwartz et al. 2004; Vanier et al. 2021; McClimans 2017). A standard, motivating example is that of a person's numerical self-rated health remaining the same, even as their objective health functioning unambiguously decreases.

This response shift literature does not straightforwardly undermine the claim that the rational, Grice-Schelling strategy is to use linear "most-least" scales. Rather, I take the response shift literature as indication of *rational quasi-cardinality*: endpoints and constructs may shift in ways that make sense to respondents given their changing circumstances, even though this can reduce comparability for some research purposes.

Hence, rational communication does not imply there will always be comparable scales across people and/or over time. Indeed, it provides an explanation for why and when rational communicators *would not* use the same endpoints. Empirical research is needed to ascertain where these shifts occur and how large they are.

Thus, to get comparable scales, on the Grice-Schelling theory, there seem to be two further conditions. First, *reference class equivalence*: respondents use the same reference class – or, if they different references classes, these nevertheless have the same endpoints (if Germans and English each use their own countrymen as the reference class for height, but their countrymen have the same distribution of heights, this choice will not affect comparability). Second, *construct consistency*, the same construct is measured across people/time.

These conditions do not seem to be met regarding self-reported QoL in health—nor is it clearly irrational for respondents to health QoL surveys to change their reference classes or concept of 'good health'. Such surveys therefore seem more useful if we want to know respondents' current evaluative stance to their than if we want a stable assessment of their health functioning.

However, the topic of this paper is not self-rated health, but subjective wellbeing. Do these problems spell doom for the notion that rational communications would use comparable assessments of these?

I don't think so. There seem to be some relevant differences. Let's think carefully about what the two main measures of subjective wellbeing—happiness and life satisfaction—are each supposed to capture and why we might care about them.

Starting with happiness, this is a feeling and matters as a feeling.[^18] For comparability, we want the endpoints to represent the same intensity of feeling, so that, if you and I are both say we 10/10, we would feel as happy as each other.

It seems plausible that 'most' and 'least' happy refer to similar, if not identical, intensities across many contexts: we share the same biology, and thus the same capacities for feelings between youth and old age;[^19] in each society, we would expect people to experience, observe, and discuss the experiences that cause highest highs (falling in love, clinching victory in a sports game) and lowest lows (bereavement, losing a sports game, having one's paper rejected).

None of this is to deny that the *causes* of happiness differ, to some degree, between people and places. The point is that the upper and lower limits of observed happiness are much the same everywhere and that rational respondents would calibrate their endpoints on these observed experiences. These points about happiness presumably apply, *mutis mutandis*, for other emotions. I mention some two exotic cases where we would expect different endpoints in a footnote for the interested reader as counter examples which arguably prove the rule.[^20]

To illustrate by contrast our concept of 'good health' seems far more context sensitive: intuitively, in ordinary language use, "happy for a 20-year-old" and "happy for a-70-year-old" mean very similar things, whereas "healthy for a 20-year-old" and "healthy for a 70-year-old" carry disparate meanings. Of course, people will differ to some degree on what they think the endpoints are, but this would be noise, rather than bias, at least in many ordinary contexts; there may be exotic or structurally unusual cases where differences become systematic and large.

Now, we turn to life satisfaction. There is a debate in the literature over whether life satisfaction should be understood psychologically as a feeling or a judgement (Cummins 2010; Diener, Inghehart and Tay 2013; Kahneman and Krueger 2006). However, for our purposes, neither choice seems to change the analysis. Suppose life satisfaction consist in, and distinctively matters as, a judgement—a judgement the individual makes for themselves about how their own life is going—rather than as a feeling (Plant 2025). The appeal of valuing life satisfaction rather than happiness is that our life satisfaction and our enjoyment can diverge quite radically: you could be happy but dissatisfied with life, and *vice versa*. So, if we want to measure life satisfaction because we want to know how individuals are judging their lives, by their own standards, then it seems appropriate to treat each respondents' endpoints as equivalent *for normative reasons*, even if respondents use different endpoints from each other. If we truly value individuals' own judgments of their lives by their standards, it seems odd to complain that they have different conceptions of what a '10/10' life means for them.

On the other hand, if we care about life satisfaction as a feeling, then the same arguments raised above apply: presumably the greatest and least *feelings of satisfaction* are similar across human contexts.

### 3.7. Closing remarks on the Grice-Schelling rational response theory

I have argued that, conditional on respondents trying to communicate accurately, as understood on the Grice-Schelling model, there is a strong rational pull towards using a linear scale and realistic endpoints. Where that pull is effective and respondents also use similar reference classes and constructs, the data will be comparable and cardinal. Where it is only partially obtains—because reference classes and/or constructs diverge—we should expect degrees of quasi-cardinality instead. Scope for quasi-cardinality arises most naturally for happiness data if different people choose different references classes for the endpoints, and those refer to different levels of happiness. I have offered a somewhat speculative argument about why we might expect rational respondents to use the same endpoints for feelings (or, at least, for life satisfaction, for us to treat their endpoint as equivalent) but why rational communications would not necessarily align in other contexts, such as the reporting of health.

We can now come back to a claim I open the paper with, that numerical scores of feelings being "are 'made-up' numbers on a scale that does not exist" (Kaiser & Oswald, 2022)? Feelings and judgements are certainly real. The numbers we use indicate an intensity of feeling on a scale where the endpoints represent the limits of intensity. "7/10" happy is then just 70% of the way from minimum to maximum happiness. Although putting numbers on feelings may seem odd, this seems no stranger than using words to describe our strength of feeling ("quite happy", "very happy"), something we do all the time.

---

## 4.1 A brief review of the empirical literature

The Grice-Schelling framework is a normative model of how rational respondents *would* use subjective scales given the goal of communicating accurately. It does not show that people *actually* use scales in roughly linear and comparable ways—determining that is an empirical matter. As noted, we sometimes think, especially in economics, that actual behaviour will be at least approximately like rational behaviour, much modern work into wellbeing is motivated by foundational results that people deviate from what it is (putatively) rational for them to do (Kahneman & Tversky, 1979).

In this third and final part of the paper, I conduct a brief review of the empirical literature for subjective wellbeing data. My aim is not to adjudicate the question of whether such scales are cardinal, which is out of scope. Rather, it is to assemble and discuss some of the evidence in light of the analysis in the earlier two parts of the paper. There has been a sudden rise in both interest in and increasing-sophisticated analyses of this topic in the last few years. The dust is yet to settle, but the trend in the literature seems to be finding evidence that there are 'small' deviations from cardinality, with 'large' deviations not seeming consistent with the evidence. Absent a theory of rational reporting, it is unclear how we would explain this result. In light of the Grice-Schelling theory, this is not mysterious: to an approximation, actual behaviour aligns with rational behaviour.

There is a further question of how *practically important* this apparent quasi-cardinality is, in following sense: if we took increasing wellbeing as a—or the—goal, and we had previously assumed cardinality, what would we now do differently if we concluded that some evidence-supported version of quasi-cardinality were true instead? This question not straightforward to answer, not only because the aforementioned dust has not settled, but also because what counts as an important deviation will depend on the question being asked and the inclinations of the person asking it.

As cardinalism is true iff subjective scales are linear and comparable, and (some version of) quasi-cardinalism is true if they are not, I look at linearity and comparability in turn. As comparability can be divided in intertemporal comparability (consistent meaning over time for a person) and interpersonal comparability (consistent meaning at a time between people), there is a two-part assessment of comparability.

### 4.2. Are subjective scales linear, that is, equal-interval?

Various pieces of evidence from the earlier literature point towards linearity. I mention three of the most prominent. Van Praag (1991) found that subjects, when given ordered evaluative verbal labels ("very bad", "bad", "not bad", "not good", "good", "very good") and asked to place these on a cardinal numerical scale, would put the labels roughly equal distances apart, indicating they constructed a linear scale. Oswald (2008) found a high correlation between objectively measured height, and height subjectively reported on a bounded scale. Krueger & Schkade (2007) found homoskedasticity in errors for test-retests of net affect, which arguably indicates linearity.

However, more recent research provides evidence of some non-linearity. A working paper by Fabian et al. (2024) interviewed members of the public and explicitly asked them about scale use, finding only 11% claimed to use an exactly linear scale – this leaves open how non-linear reporting is.

The most powerful analysis comes from Kaiser and Lepinteur (2025), also still a working paper. They develop a novel way of quantifying non-linearity, using a cost function, 'C', measured on a 0-1 scale where 0 is perfect linearity, and 1 is, as they describe it, 'maximally non-linear' (if C is 1 then, on a 0-10 scale, one of the increments represent a jump in the full range of the scale). For their assessment, they assume comparability. They collect survey data from respondents, using a range of methods, such as giving them sliders to indicate their own scale use, and find the point estimates for C are between 0.105 and 1.51. This leads them to conclude that the 'plausible' linearities are 'mild' rather than extreme. This seems a partial vindication of the Grice-Schelling theory, insofar as there are not large deviations. Kaiser and Lepinteur (2025) go on to systematically test how susceptible signs of coefficients in wellbeing data, and relative magnitudes of those coefficients, are to what they call 'plausible' deviations from linearity. They find that "coefficient signs are remarkably robust to the mild departures from linear scale-use [they] document experimentally", for instance whether these deviations will change income from being associated with higher wellbeing to lower wellbeing.

Kaiser and Lepinteur (2025) do note, however that "estimates of relative effect sizes, which are crucial for policy applications, are unreliable even under these modest non-linearities". They compare the magnitudes of employment to income and find that these can change by an order of magnitude for a 'plausible' deviation. To see the relevance, suppose one thought, on assuming cardinality, that some unemployment policy was twice as cost-effective as some income policy; after adopting a plausible quasi-cardinality scale, the income policy could be five times more cost-effective.

A note of caution. What Kaiser and Lepinteur (2025) do is, in some sense, an unrealistic worst-case analysis. They assume that everyone has the *same* plausible deviation and then look for the specific deviation that is most threatening to reversals or changes in ratios of coefficients. Yet, their data shows people use a variety of non-linearities, and for our purposes we want to know how much the aggregate of actual non-linear report changes results, rather than if we assume everyone using the same (most threatening) non-linearity. Hence, an order of magnitude change is the ratios of relative effect sizes should be a seen a (very) upper bound, not as indicating the true scale of deviation policymakers (and others) should correct for today. Further work to develop and deploy this innovative method using more realistic assumptions is needed.[^21]

How can we reconcile all this with the claims in two prominent papers, Bond & Lang (2019) and Schröder & Yitzhaki (2017), that argue coefficients can easily be sign-reversed under assumptions of non-linearity? Put simply, both papers are hypothetical arguments about what *could* happen if reporting was extremely non-linear, but do not provide evidence for this non-linearity. Kaiser and Vendrik (2020) replicate and modify Bond & Lang (2019) and argue that, for the reversal Bond & Lang (2019) propose, the reporting function would need to be strongly non-linear and that such reversals are "impossible or implausible for almost all variables of interest; Kaiser and Lepinteur (2025) can be seen as providing further evidence that large deviations not empirically motivated.

In sum, the recent literature indicates mild non-linearity of an as yet undetermined practical significance. What about comparability?

### 4.3. Are subjective scales comparable over time?

Ng (2008) observes that happiness researchers seem not to have noticed that individuals can and do *rescale*—alter what a scale's endpoints represent—over their lives. On the rational response, respondents would try to avoid rescaling, unless context deemed it relevant.

A motivation for rescaling comes from the literature on how people's subjective wellbeing changes in response to major life events, such as marriage, getting into a relationship, bereavement, becoming unemployed, or becoming disabled (Clark et al., 2008, 2016, 2018; Luhmann et al., 2012). In general, people's *reported* wellbeing returns towards its pre-event level in the years following. This might indicate (1) but it could also be explained by (2) *(hedonic) adaptation*, where the subjective effect reduces over time (Frederick & Loewenstein, 1999). Note that, unlike rescaling, adaptation poses no threat to intertemporal cardinality, as the same numbers still represent the same levels. To illustrate the difference, suppose Sam reports he is 8/10 happy now. He has an accident and, two years later, reports 8/10 again. It could be Sam has *adapted* and is genuinely as happy as he was before. Or, it could be that Sam is less happy but has *rescaled*—specifically, he has shrunk his scale, lowering the level of happiness a 10/10 represents. Should the fact reported wellbeing returns to pre-event levels be explained by rescaling, adaptation, or some combination of the two?

The literature on the subjective wellbeing effects of life events does not seem to provide decisive evidence for rescaling. We should expect some adaptation to occur, given evolutionary arguments suggest it is useful for survival and reproduction (Perez-Truglia, 2012; Rayo & Becker, 2007). Further, the evidence indicates that people reported subjective wellbeing adapts fully to some events, such as bereavement and getting married, they only *partially* adapt to others, namely being in a relationship, becoming disabled, or becoming unemployed (Clark et al., 2018). If rescaling occurs due to a cognitive process, we might expect to see it for all events in longitudinal subjective wellbeing data.[^22] What's more, we can appeal to our wider intuitive understanding of human lives to explain the difference. For instance, it makes sense that getting married (as distinct from being in a relationship) has a short-term effect—the 'honeymoon phase' wears off and normality resumes—whereas being unemployed continues to feel bad. So, these longitudinal data on subjective wellbeing do not seem to require we conclude that there is rescaling here.

To investigate possible rescaling further, a method proposed in the literature involves utilising memories. *Observed-past* ratings, how respondents said they felt at the time is compared to *recalled* ratings, how they remember feeling (Prati & Senik, 2020). The idea is that mismatches may indicate rescaling. The challenge here is that mismatches might also be explained by recall bias (misremembering) or effort justification (e.g. you feel the same in two ways of a survey but want to say your life has improved).

A novel method proposed by Fabian (2022) is designed to avoid these competing explanations test more directly for scale shifts. In this study, respondents are asked three questions. (1) to rate their life satisfaction for each of the last 10 years on a life graph; (2) to say how satisfied they are with life now; (3) to think back 10 years and say how they would have answered then about how satisfied they were with life. The idea is if respondents show a significant change in response to the first question, but no change (or an inverse change) in response to the difference between the second and third, that indicates recalling. Fabian (2022) gives an example of a respondent, A14, whose answer to question (1) goes from 3 to 8 over the 10-year period but gives 7/10 to questions (2) and (3), which is puzzling. The paper offers various definitions of scale-norming (what I call 'rescaling') and finds 5.3-13.6% of respondents rescale depending on the one used (the details aren't crucial here); or, to say the same thing differently, 85-95% did not rescale.

This seems to indicate a similar picture to what we saw for linearity, namely that deviations are 'mild' rather than 'extreme', although note these data are about the *percentage* who deviate, rather than *extent of deviation* for those who do.[^23] So, this does not rule out there being a subset of respondents to have large deviations, which could be practically consequential, particularly if people extend their scales because very good or bad things have happened to them, on which assuming comparability would underestimate the consequence of these events.

Finally, a helpful test of the potential severity of the issue is provided by Kaiser (2022) who analyses a dataset where people reported their wellbeing today, how they were last year, and whether they are better or worse than last year. A subset of people (about 6,000 of 75,000, i.e. 8%) say their life is better or worse than last year, but their reports show the opposite. This could be due to misremembering or rescaling. Kaiser supposes, for the sake of argument, *that inconsistencies are entirely due to rescaling*. If they were, would the results change? Much as with Kaiser and Lepinteur (2025) regarding linearity, Kaiser (2022) finds no sign reversals for coefficients, but as we noted this is arguably a weak test. Kaiser (2022) does find the magnitudes of the coefficients change. As before, this shows there could be important practical implications resulting from these deviations, but this possibility needs to be investigated further.

### 4.4. Are subjective scales comparable between people?

Research finds many things are associated with subjective wellbeing scores: age, gender, income, employment, proximity to green space, and so on (Dolan et al., 2008). Do they indicate genuine differences in wellbeing, are they due to differences in scale use for different groups, or some combination? Intuitively, the differences can't be all be due to scale use: for instance, we expect richer people to *report* being happier because they *are* happier, not just that rich people use scales differently.

The standard test used to test for different scales used between people are *anchoring vignettes*, where respondents are asked to rate the wellbeing of someone whose life circumstances are described in a vignette (King et al., 2004; Kapteyn et al. 2007). This relies on two main assumptions, *vignette equivalence*, that all individuals think the person in the vignette has the same underlying experience of life, and *response consistency*, that respondents use the same scale for themselves and those in the vignette. Given these assumptions, respondents' own SWB can be adjusted relative to their ratings of the vignettes (e.g. if A and B give their wellbeing as 7/10, but A rates the vignettes higher than B, that implies A's true wellbeing score is lower than B's).

If we take the vignette approach as face value, this does suggest some differences in scale use. I note two cases: gender and county rankings. Montgomery (2022) finds that, although women report a higher average number for life satisfaction, after a vignette adjustment, women are less satisfied. The 'raw' wellbeing scores are 2.95 for women and 2.93 men, and after the proposed alteration (using men's reporting function), they are 2.91 for women and 2.93 for men.[^24] So, as the initial differences between the sexes, and the size of change after the vignette-adjustment, are about 1% of the scale length, it seems natural to describe both as 'small', although there may be decisions where this would be practically significant.

Angelini et al. (2014) applies vignettes to various European countries and finds changes the country ordering, e.g., Denmark drops from 1st to 5th. The average cardinal change for each country is about 0.4 on 0-10-point scale.[^25] Whether this counts as 'large' or 'small' change seems quite open to the reader's interpretation. If we look at the World Happiness Report data, partially reproduced in figure 4, we see the range of country averages goes from around 7.8 to around 2.4. Shifts of half a point or so at the top of the rankings could substantially change our view whether we might want to take a Nordic or Mediterranean approach to finding the good life—do we need more hygge or more pizza?—but wouldn't be enough to put the Nordics' life satisfaction in the ballpark of countries in Sub-Saharan Africa.

> **Figure 4.** Life satisfaction scores for different countries including how between-country variation is explained by various factors. *(Figure from World Happiness Report, Helliwell et al., 2023)*

However, vignettes have recently come under criticism in the literature, particularly the assumption of vignette equivalence (see Benjamin et al. (2024) and references therein). For instance, Deaton (2011) points out respondents may differ in their empathy or fill in unspecified details of the vignette based on their own experiences, so respondents genuinely disagree on how the person's life is going and thus vignette equivalence cannot be safely assumed.

In response to this, Benjamin et al. (2023) have proposed an ingenious new method who avoids the use of vignettes and instead uses *calibration questions*, such how dark participant rate a series of differentially shaded circles, where the darkness of the circles is objectively measurable. For their assessment, they assume linearity. This allows for a correction for comparability in what they called *general scale use* (how participants answer surveys in general). This is a partial correction for *dimensional scale use* (answers about a particular property, such as life satisfaction), where how partial a correction it is remains unknown; the idea is that you could answer happiness surveys differently from other sorts of surveys. They investigate how demographics can alter general scale and find it "will make little difference for SWB questions such as life satisfaction but will matter more for SWB questions such as "no anxiety"". Again, the size of corrections is 'small', around 1 point on a 100-point scale. The largest change in anxiety scores is unemployment, which goes from -7.7 (unadjusted) to -7.0 (a 'method-of-moments'-adjustment), so around 10%. Again, if the method is correct, this could make the difference in some practical choices.

That completes our whistlestop tour of the evidence. The pattern is fairly consistent across linearity, intertemporal comparability, and interpersonal comparability. There is some evidence of mild deviations from cardinality—or, to say the same thing differently, there is evidence of mild quasi-cardinality—but no evidence for substantial deviations. As noted, in light of the Grice-Schelling theory, this results seems unsurprising, if we expect actual behaviour to close, but not identical, to rational behaviour. Each of these deviations could have substantial practical implications, depending on the question being asked, and further work would need to explore where they might be practical differences, as well as refining the methods.

I close this section with a worry about the current methods. Taken individually, these do not seem incredibly robust, as we often have to make contestable assumptions for the sake of the analysis: we noted, for instance, just above, that vignettes have come under fire, but the novel method proposed Benjamin et al. (2023) to get around only allows a partial correction. Kaiser and Lepinteur (2025) use various survey methods for determining the magnitude of non-linearity, but they note these methods provide different results, even from the same people.

This worry is deepened when we look collectively at the methods. In general, when testing for something, we want to be able to hold everything else constant. But this is not easy, and may not even be possible, to do for scale cardinality. Specifically, Kaiser and Lepinteur's (2025) method involves assuming comparable endpoints to tests for linearity; they find some non-linearity. Benjamin et al.'s (2023) method involves assuming linearity, then testing for comparability; they find some non-comparability. This suggests a conceptual confusion across methods, as the first method grants assumption A, which the second method says we should grant, for the sake of testing assumption B, which the second method takes for granted(!). Yet, if we cannot be confident in either of the two assumptions, how can we test for the other? I do not think either method requiring take one assumption as fixed, and perhaps both assumptions could be allowed to vary simultaneously to fit the data, but this will presumably widen the uncertainty in the conclusions. While testing for cardinality may be, or seem to be, an empirical question, it is unclear if we can make inferences from the data without making *some* questionable assumption, and thus falling back on theory. The ground does not seem very steady beneath our feet. Given this uncertainty, it is therefore possible that future work will revise this picture substantially, either by identifying practically important forms of quasi-cardinality or by showing current methods systematically understate them.

---

## 5. Concluding remarks

Suppose we started with a healthy dose of scepticism about interpreting data from subjective scales as cardinal; after all, it may seem too good to be true that we can have quantitative, comparable measures of feelings by taking people's answers a face value. My conclusion is that, on reflection, such scepticism is harder to sustain that we might have expected.

I began by clarifying the problem. There are three options on the table for how to interpret happiness scales, our 'measuring-sticks-for-feelings': roughly, they are straight (cardinalism), wonky (quasi-cardinalism), or invisible (ordinalism). I pressed our scales could be wonky in many ways—and hence the sceptic of cardinalism should, ideally, specify and justify their preferred alternative. I argued that ordinalism requires scepticism we do not seem to have in ordinary life, but we must be attentive the possibility, extent, and implication of quasi-cardinality.

I offered a novel Grice-Schelling rational response theory for subjective scales. In short, I argued that rational respondents will aim to make themselves understood when answering surveys, and this ends up with them using linear and comparable, and so cardinal, scales; at least, this would occur if rational respondents used the same references points, which I optimistically argued seems plausible for subjective wellbeing surveys, if not for other areas, such as health-related quality of life.

Finally, we looked at the empirical literature on possible deviations from cardinality. The general picture is the latest evidence suggests weak violations are possible, even likely, but strong ones are not, and it is an open question of how practical important this may be, as well as how confident we can be in the testing methods, individually or in aggregate. As a consequence, it does seem reasonable for researchers to tentatively (continue to) treat subjective scales as cardinal, at least until and unless new evidence comes to light, but they should be on the lookout for that evidence. Or, to put the same thing differently, it seems unreasonable to reject cardinality, not least because it's unclear which version of quasi-cardinality we would accept, or how much difference it would make.[^26] If you and I say we are '7/10 happy', the sensible working assumption is that we are about as happy as each other. As I noted at the start, that claims that wellbeing researchers should continue to do what they were already doing would be a questionably interesting conclusion if there were not already such doubt over whether they should keep doing it.

Presumably, some will remain sceptical. Maybe new evidence will vindicate this scepticism. What should people do if they do not believe that, practically speaking, subjective scales are cardinal? I end with a plea not to give up on feelings data altogether. So long as we reject ordinalism, which I noted we seem to do outside the seminar room, then we are quasi-cardinalists, which means we have some beliefs about how bent and oddly-lengthed our measuring sticks are. Hence it is possible, in principle, for quasi-cardinalists to apply the appropriate size and type of correction, whatever they believe it is, to yield answers that are cardinally comparable. This point was made in the literature for some time ago (Kristoffersen, 2011; Y. Ng, 1997). We saw how Kaiser and Lepinteur (2025) undertook such a correction in practice. With further research, it should become increasingly straightforward to test how potential quasi-cardinalities would alter the results. Consequently, this means that concerns about how people report happiness are not a terminal barrier to understanding how happy they are—and how they could become happier.

---

## Footnotes

[^1]: An earlier version of this document was published as a working paper [redacted for blind review]

[^2]: This standard meaning of 'cardinal' in the literature is, admittedly, a slight abuse of terminology. Cardinal numbers connote an amount (as opposed to ordinal numbers, which convey a ranking). Thus, the Richter scale for earthquakes, where each subsequent scale number represents a 10-fold increase in magnitude, is logarithmic cardinal scale, but a cardinal scale nevertheless: it represents quantities (scale 3 earthquake has 100 times more energy than a scale 5 one, etc.). Wellbeing researchers seem to take a 'cardinal' scale to mean, more specifically, an *equal-interval* cardinal scale. I stick with this terminology here and suggest we use 'quasi-cardinal' to refer to cardinal, but non-equal interval scales of feelings.

[^3]: Ng (1995, 1997) argues that *feelings* are cardinal in nature but does not provide arguments that the *measures* are cardinal. Kristoffersen (2011) outlines the issues and offers a theoretical argument for linear (i.e. equal-interval) scales but does not provide supporting empirical evidence. Kristoffersen (2017) defends a linear interpretation by comparing life satisfaction reports to mental health scores. This uses one subjective scale to assess another, so won't convince a sceptic—why assume mental health scores are cardinal? Various authors have argued that 'noise' in measurement is not a concern for cardinality (Bertrand & Mullainathan, 2001; Bronsteen et al., 2012; Dolan & White, 2007); I agree, but I explain (§2) we need to worry about another issue, bias. Ferrer‐i‐Carbonell & Frijters (2004) use different statistical tests which assume subjective data is either cardinal or ordinally comparable and find it makes little difference to the results.

[^4]: I note Alexandrova & Haybron (2016), two philosophers of science, object that the construction validation in social science tends to be *theory avoidant*, and focus on statistical tests at the expense of explicit theorising about what the constructs consist in. Discussing this concern, and its relevance, is out of scope here.

[^5]: I suppose one might try to make an argument that validity implies (near) cardinality, but I do not explore that here.

[^6]: Although it will create a separate issue of attenuation bias, i.e., a bias towards zero in the results. This can be addressed via appropriate controls (Bertrand & Mullainathan, 2001).

[^7]: I suppose we could call this *epistemological ordinalism*, to contradistinguish it from *phenomenal ordinalism*, the latter being the position that feelings are not quantities and only representable as a ranking. I note epistemological ordinalism and phenomenal ordinalism are mutually exclusive beliefs: the former means feelings are quantities (but we do not know the reporting function) the latter means are not quantities. As per the law of contradiction, two contradictory positions cannot both be true.

[^8]: Rationality here is simply understood instrumentally: choosing the right means for a given end. Readers unhappy with the term 'irrational' can replace it with 'eccentric'.

[^9]: For readers of a Bayesian inclination, we see the rational response theory as setting our 'prior', which we then update in light of the data to form a 'posterior'.

[^10]: We don't need to answer (1) and (2) here. They are exactly what we hope to infer from the surveys.

[^11]: Technically, one just needs to decide the magnitude difference between any two points, then specify the shape of the reporting function, but it's simpler to think in terms of endpoints.

[^12]: If would not be irrational if you had had a prior agreement with other respondents about using a specific alternative. But that would not be a focal point, as focal points are picked in the absence of communication.

[^13]: I thank an anonymous reviewer for bringing this to my attention.

[^14]: What the psychophysics experiments *observe* are (1) changes in the objectively-measurable property and (3) reports of subjective intensity. They cannot not directly observe (2), changes in felt intensity. To get to the standard Weber-Fechner conclusion that doubling in (1) result in equal-size changes in (2), felt intensity, of the basis of the fact that each doubling in (1) causes equal-size changes in (3), reported intensity, one must also make an assumption about the relationship between (2) felt intensity and (3) reported intensity. Specifically, the necessary claim for the Weber-Fechner law is that there is a linear relationship between (2) and (3): a 1-unit reported change corresponds to a 1-unit felt change. If we *instead* believed that the relationship between (2), actual intensity, and (3) reported intensity was, logarithmic, we could then conclude there was a linear relationship between (1) actual intensity and (3) objectively-measured stimuli, that is, for each doubling in, say, objectively measurable sound is *experienced* as twice as loud.

[^15]: I mention in passing a concern that everyday language indicates we do not interpret the scale endpoints as the realistic limits. For instance, we say things like "that show was amazing – 12/10". Note, however, we often also say things like "I'm giving it 110% effort in the match tomorrow". One explanation is neither of these are meant to be taken literally, but rather the speakers are deliberately violating linguistic norms for effect. For this violation to be effective, the linguistic convention must be there. Another explanation, discussed more later, is the speaker sincerely believes the show was better than they thought possible. But, again, this indicates 10/10 refers to a known conventional maximum, which the speaker is using as the reference point.

[^16]: Some people say it's not possible to be 10/10 happy. One way to explain this is that people are intuiting the scales should be big enough that you can always answer within its bounds.

[^17]: While the rational respondent is trying to guess what other people will use for the endpoints, they won't know what this is. If they the averaged answer is accurate, they should just try to guess that based on their own experience. N.B. In the oxen-estimation case, if I ask you to guess (A) how much the ox weighs or (B) how much others will say it weighs, you would give the same number.

[^18]: I set aside the discussion (in philosophy) that the word 'happiness' should refer, not to a feeling, but to judgements, attitudes, or a longer-term emotional inclination (Feldman 2008, 2010; Haybron 2016). My sense of happiness is the ordinary language one and that use in e.g. Bentham (1789).

[^19]: At least, after some point of maturity.

[^20]: One case is *Aliens*. If they appeared and rated their happiness on a 0-10, least-to-most scale, we would expect the number-magnitudes to differ substantially for ours (by an unknown and possibly unknowable degree) due to differential physiology and experiences. A second case is *Isolated Dystopia*, where people experience less happiness and more unhappiness (perhaps due to an oppressive regime) and lack awareness of lives in other countries (hence cannot calibrate their experiences relative to other people, even if they wanted to). We would expect their 10/10 to refer to a lower level of happiness, and their 0/10 to refer to a greater level on unhappiness—again to an unknown degree. So, we would be loath to directly compare North Korea's SWB scores to those of other countries, but it's unclear any other country would be so incomparable. The point is that to have different endpoints it seems necessary to have (A) different biology or both of (B) a different range of experiences and (C) lack of awareness of others.

[^21]: One of paper's authors confirmed in private correspondence that they plan to undertake such work, and for these reasons.

[^22]: An anonymous reviewed pointed out that there is substantial evidence of response shift in health-related QoL. For the reasons given in an earlier section, it is unclear what this implies for the comparability of subjective wellbeing data, given there seem to be relevant differences between these two sorts of self-assessments.

[^23]: I note another potential explanation for these results if that people have changed evaluative standards. Perhaps at t1, your life was 7/10 by your standards. It's still 7/10 by your standards at t2, but your standards have changed: by your current standards, you now think ill of your life at t1. This raises a normative question of whether there is a privileged vantage point from which to judge one's life (if so, when?) or if each time period should be treated as having equal value.

[^24]: From the bottom of table 6 in Montgomery (2022). I report these to two decimal places (from three) to improve readability.

[^25]: Estimated from observation from figure 3 in Angelini et al. (2014).

[^26]: I suppose, on a maximally strict definition of cardinalism, where there must be no observable deviations from cardinality, cardinalism would be false (and quasi-cardinalism true). But this seems impractically strict.

---

## Bibliography

Alexandrova, A., & Haybron, D. M. (2016). Is Construct Validation Valid? *Philosophy of Science*, 83(5), 1098–1109. https://doi.org/10.1086/687941

Angelini, V., Cavapozzi, D., Corazzini, L., & Paccagnella, O. (2014). Do Danes and Italians Rate Life Satisfaction in the Same Way? Using Vignettes to Correct for Individual-Specific Scale Biases. *Oxford Bulletin of Economics and Statistics*, 76(5), 643–666. https://doi.org/10.1111/obes.12039

Benjamin, D. J., Cooper, K., Debnam, J., Heffertz, O., Kimball, M., & Fleurbaey, M. (2023). Adjusting for Scale-Use Heterogeneity in Self-Reported Well-Being.

Benjamin, D. J., Cooper, K., Heffetz, O., & Kimball, M. (2024). From Happiness Data to Economic Conclusions. *Annual Review of Economics*, 16(1), 359–391. https://doi.org/10.1146/ANNUREV-ECONOMICS-081623-021136/CITE/REFWORKS

Bertrand, M., & Mullainathan, S. (2001). Do People Mean What They Say? Implications for Subjective Survey Data. *American Economic Review*, 91(2), 67–72. https://doi.org/10.1257/AER.91.2.67

Bond, T. N., & Lang, K. (2019). The sad truth about happiness scales. *Journal of Political Economy*, 127(4), 1629–1640. https://doi.org/10.1086/701679

Bronsteen, J., Buccafusco, C. J., & Masur, J. S. (2012). Well-Being Analysis vs. Cost-Benefit Analysis. *SSRN Electronic Journal*. https://doi.org/10.2139/ssrn.1989202

Clark, A. E., D'Ambrosio, C., & Ghislandi, S. (2016). Adaptation to poverty in long-run panel data. *Review of Economics and Statistics*, 98(3), 591–600. https://doi.org/10.1162/REST_a_00544

Clark, A. E., Diener, E., Georgellis, Y., & Lucas, R. E. (2008). Lags and leads in life satisfaction: a test of the baseline hypothesis. *The Economic Journal*, 118(529), F243.

Clark, A. E., Powdthavee, N., Flèche, S., Layard, R., & Ward, G. (2018). *The origins of happiness: the science of well-being over the life course*.

Csikszentmihalyi, M., & Larson, R. (1987). Validity and reliability of the Experience-Sampling Method. *The Journal of Nervous and Mental Disease*, 175(9), 526–536.

Cummins, R. A. (2010). Subjective wellbeing, homeostatically protected mood and depression: A synthesis. *Journal of Happiness Studies*, 11(1), 1–17

Deaton, A. (2011). Comment on 'Work Disability, Work, and Justification Bias in Europe and the United States'. In D. A. Wise (Ed.), *Explorations in the Economics of Aging* (pp. 312–314). National Bureau of Economic Research.

Diener, E., Inglehart, R., & Tay, L. (2013). Theory and Validity of Life Satisfaction Scales. *Social Indicators Research*, 112(3), 497–527. https://doi.org/10.1007/s11205-012-0076-y

Dolan, P., Peasgood, T., & White, M. (2008). Do we really know what makes us happy? A review of the economic literature on the factors associated with subjective well-being. *Journal of Economic Psychology*, 29(1), 94–122. https://doi.org/10.1016/j.joep.2007.09.001

Dolan, P., & White, M. P. (2007). How Can Measures of Subjective Well-Being Be Used to Inform Public Policy? *Perspectives on Psychological Science*, 2(1), 71–85. https://doi.org/10.1111/j.1745-6916.2007.00030.x

Edgeworth, F. Y. (1881). *Mathematical Psychics*. London: Kegan Paul.

Fabian, M. (2022). Scale Norming Undermines the Use of Life Satisfaction Scale Data for Welfare Analysis. *Journal of Happiness Studies*, 23(4), 1509–1541. https://doi.org/10.1007/S10902-021-00460-8/TABLES/13

Fabian, M., Kaiser, C., Panasiuk, S., Funk, S. & Brett, C. (2024). Evidence against the simple validity of life satisfaction scales from long form cognitive interviews. IARIW Paper: https://iariw.org/wp-content/uploads/2024/08/FINAL-Fabian-et-al.-Cognitive-Interviewing IARIW.pdf

Feldman, F. 2008. Whole life satisfaction concepts of happiness. *Theoria* 74, 219–238

Feldman, F. (2010) *What Is This Thing Called Happiness?* Oxford: Oxford University Press.

Ferrer-i-Carbonell, A., & Frijters, P. (2004). How Important is Methodology for the estimates of the determinants of Happiness?*. *The Economic Journal*, 114(497), 641–659. https://doi.org/10.1111/j.1468-0297.2004.00235.x

Fleurbaey, M., & Blanchet, D. (2013). *Beyond GDP: Measuring Welfare and Assessing Sustainability*. https://doi.org/10.1093/ACPROF:OSO/9780199767199.001.0001

Frayman, D., Krekel, C., Layard, R., MacLennan, S., & Parkes, I. (2024). *Value for money: How to improve wellbeing and reduce misery* (CEPSP44). https://cep.lse.ac.uk/_new/publications/abstract.asp?index=11099

Frederick, S., & Loewenstein, G. (1999). Hedonic adaptation. In D. Kahneman, E. Diener, & N. Schwarz (Eds.), *Well-Being: The Foundations of Hedonic Psychology* (pp. 302–329). Russell Sage Foundation

Frijters, P. (1999). *Explorations of welfare and well-being*. Thela Thesis Amsterdam.

Frijters, P., Clark, A. E., Krekel, C., & Layard, R. (2020). A happy choice: wellbeing as the goal of government. *Behavioural Public Policy*, 4(2), 126–165. https://doi.org/10.1017/BPP.2019.39

Frijters, Paul., & Krekel, Christian. (2021). *A Handbook for Wellbeing Policy-Making: History, Theory, Measurement, Implementation, and Examples*. OUP.

Gómez-Emilsson, A. (2019). *Logarithmic Scales of Pleasure and Pain: Rating, Ranking, and Comparing Peak Experiences Suggest the Existence of Long Tails for Bliss and Suffering* - EA Forum. https://qualiacomputing.com/2019/08/10/logarithmic-scales-of-pleasure-and-pain-rating-ranking-and-comparing-peak-experiences-suggest-the-existence-of-long-tails-for-bliss-and-suffering/

Grice, P. (1989). *Studies in the Way of Words*. Harvard University Press.

Hausman, D. M. (1995). The impossibility of interpersonal utility comparisons. *Mind*, 104(415), 473–490.

Haybron, D. (2016) Mental state approaches to well-being. In *The Oxford Handbook of Well-Being and Public Policy*, ed. Adler, M. and Fleurbaey, M., 347–378. Oxford: Oxford University Press

Helliwell, J. F., Layard, R., Sachs, J. D., Neve, J.-E. De, Aknin, L. B., & Wang, S. (2023). *World Happiness Report 2023*. https://worldhappiness.report/ed/2023/

Helliwell, J. F., Layard, R., Sachs, J. D., Neve, J.-E. De, Aknin, L. B., & Wang, S. (Eds.). (2025). *World Happiness Report 2025*. University of Oxford: Wellbeing Research Centre. https://worldhappiness.report/ed/2025/

Kahneman, D. (2011). *Thinking, fast and slow*. Macmillan.

Kahneman, D., & Krueger, A. B. (2006). Developments in the Measurement of Subjective Well-Being. *Journal of Economic Perspectives*, 20(1), 3–24. https://doi.org/10.1257/089533006776526030

Kahneman, D., Rosenfield, A., Gandhi, L., & Blaser, T. (2016, October). Noise: How to Overcome the High, Hidden Cost of Inconsistent Decision Making. *Harvard Business Review*. https://hbr.org/2016/10/noise

Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. *Econometrica*, 47(2), 263–292. https://doi.org/10.2307/1914185

Kaiser, C. (2022). Using memories to assess the intrapersonal comparability of wellbeing reports. *Journal of Economic Behavior & Organization*, 193, 410–442. https://doi.org/10.1016/J.JEBO.2021.11.009

Kaiser, C., & Oswald, A. J. (2022). The scientific value of numerical measures of human feelings. *Proceedings of the National Academy of Sciences of the United States of America*, 119(42). https://doi.org/10.1073/PNAS.2210412119/-/DCSUPPLEMENTAL

Kaiser, C., & Vendrik, M. (2020). *How threatening are transformations of happiness scales…* (2020–19). https://www.inet.ox.ac.uk/publications/no-2020-19-how-threatening-are-transformations-of-happiness-scales-to-subjective-wellbeing-research/

Kaiser, C. & Lepinteur, A. (2025). Measuring the unmeasurable? Systematic evidence on scale transformations in subjective survey data. Oxford Wellbeing Research Working Paper #2503. https://wellbeing.hmc.ox.ac.uk/papers/2503-measuring-the-unmeasurable systematic-evidence-on-scale-transformations-in-subjective-survey-data/

Kapteyn, A., Smith, J. P., & Van Soest, A. (2007). Vignettes and self-reports of work disability in the United States and the Netherlands. *American Economic Review*, 97(1), 461–473.

King, G., Murray, C. J. L., Salomon, J. A., & Tandon, A. (2004). Enhancing the validity and cross-cultural comparability of measurement in survey research. *American Political Science Review*, 98(1), 191–207.

Kristoffersen, I. (2010). The Metrics of Subjective Wellbeing: Cardinality, Neutrality and Additivity*. *Economic Record*, 86(272), 98–123. https://doi.org/10.1111/J.1475-4932.2009.00598.X

Kristoffersen, I. (2011). The Subjective Wellbeing Scale: How Reasonable is the Cardinality Assumption? In *Economics Discussion / Working Papers* (11-15). The University of Western Australia, Department of Economics.

Kristoffersen, I. (2017). The Metrics of Subjective Wellbeing Data: An Empirical Evaluation of the Ordinal and Cardinal Comparability of Life Satisfaction Scores. *Social Indicators Research*, 130(2), 845–865. https://doi.org/10.1007/s11205-015-1200-6

Krueger, A., & Schkade, D. (2007). *The Reliability of Subjective Well-Being Measures*. https://doi.org/10.3386/w13027

Layard, R. (2003). Happiness: has social science a clue? Lecture 1: what is happiness? Are we getting happier? *Lionel Robbins Memorial Lecture Series*.

Luhmann, M., Hofmann, W., Eid, M., & Lucas, R. E. (2012). Subjective well-being and adaptation to life events: A meta-analysis. *Journal of Personality and Social Psychology*, 102(3), 592–615. https://doi.org/10.1037/a0025948

Ng, Y. (1997). A case for happiness, cardinalism, and interpersonal comparability. *The Economic Journal*, 107(445), 1848–1858.

Ng, Y.-K. (1995). Towards welfare biology: Evolutionary economics of animal consciousness and suffering. *Biology and Philosophy*, 10(3), 255–285. https://doi.org/10.1007/BF00852469

Ng, Y.-K. (2008). Happiness studies: Ways to improve comparability and some public policy implications. *Economic Record*, 84(265), 253–266. https://doi.org/10.1111/j.1475-4932.2008.00466.x

OECD. (2013). *Guidelines on Measuring Subjective Well-being*. OECD Publishing. https://doi.org/10.1787/9789264191655-en

Oswald, A. J. (2008). On the curvature of the reporting function from objective reality to subjective feelings. *Economics Letters*, 100(3), 369–372. https://doi.org/10.1016/j.econlet.2008.02.032

Peart, S. J., & Levy, D. M. (2005). From Cardinal to Ordinal Utility Theory. Darwin and Differential Capacity for Happiness. *American Journal of Economics and Sociology*, 64(3), 851–879. https://doi.org/10.1111/j.1536-7150.2005.00394.x

Perez-Truglia, R. (2012). On the causes and consequences of hedonic adaptation. *Journal of Economic Psychology*, 33(6), 1182–1192. https://doi.org/10.1016/j.joep.2012.08.004

Plant, M., McGuire, J., Dupret, S., Dwyer, R., & Steward, B. (2025). Giving to others: How to convert your money into greater happiness for others. In J. F. Helliwell, R. Layard, J. D. Sachs, L. B. Aknin, & S. Wang (Eds.), *World Happiness Report 2025*. Wellbeing Research Centre, University of Oxford. https://doi.org/https://doi.org/10.18724/whr-e0cy-0r69

Plant M. Can I get a little less life satisfaction, please? *Economics and Philosophy*. Published online 2025:1-22. doi:10.1017/S026626712510045X

Portugal, R. D., & Svaiter, B. F. (2011). Weber-Fechner law and the optimality of the logarithmic scale. *Minds and Machines*, 21(1), 73–81. https://doi.org/10.1007/s11023-010-9221-z

Prati, A., & Senik, C. (2020). Feeling good or feeling better? In *Working Papers* (13166; DP). HAL.

Rayo, L., & Becker, G. S. (2007). Evolutionary Efficiency and Happiness. *Journal of Political Economy*, 115(2), 302–337. https://doi.org/10.1086/516737

Robbins, L. (1932). *An essay on the nature and significance of economic science*,. Macmillan. http://www.worldcat.org/title/essay-on-the-nature-significance-of-economic-science/oclc/838285

Russell, B. (1905). ON DENOTING. *Mind*, XIV(4), 479–493. https://doi.org/10.1093/MIND/XIV.4.479

Schelling, T. C. (1960). *The strategy of conflict*. Harvard University Press.

Schröder, C., & Yitzhaki, S. (2017). Revisiting the evidence for cardinal treatment of ordinal variables. *European Economic Review*, 92, 337–358. https://doi.org/10.1016/J.EUROECOREV.2016.12.011

Schwarz, N. (1995). What Respondents Learn from Questionnaires: The Survey Interview and the Logic of Conversation. *International Statistical Review / Revue Internationale de Statistique*, 63(2), 153. https://doi.org/10.2307/1403610

Stevens, S. S. (1957). On the psychophysical law. *Psychological Review*, 64(3), 153–181.

van Praag, B. M. S. (1991). Ordinal and cardinal utility. An integration of the two dimensions of the welfare concept. *Journal of Econometrics*, 50(1–2), 69–89. https://doi.org/10.1016/0304-4076(91)90090-Z

Wittgenstein, L. (1953). *Philosophical investigations* (G. Anscombe & R. Rhees, Eds.). Blackwell.

Wodak, D. (2019). What If Well-Being Measurements Are Non-Linear? *Australasian Journal of Philosophy*, 97(1), 29–45. https://doi.org/10.1080/00048402.2018.1454483

YouGov. (2018, November). How good is "good"? https://today.yougov.com/topics/lifestyle/articles-reports/2018/10/11/how-good-good
